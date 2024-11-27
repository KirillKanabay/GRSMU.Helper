import { Component, DestroyRef, signal } from '@angular/core';
import { AccountApiService } from '../../../../services/api/account-api.service';
import { StudentIdCredentialsModel } from '../../types/student-id-credentials.model';
import { UserGroupInfoModel } from '../../../../types/groupInfo/userGroupInfo.model';
import { StepStageState } from '../step-stage/step-stage.component';
import { GroupInfoApiService } from '../../../../services/api/group-info.api';
import { concatWith } from 'rxjs';
import { GroupLookupModel } from '../../../../types/groupInfo/group-lookup.model';
import { Router } from '@angular/router';
import { AppRoutesService } from '../../../../services/app.route.service';

@Component({
  selector: 'app-registration-app-main-layout',
  templateUrl: './registration-layout.component.html',
  styleUrl: './registration-layout.component.scss'
})
export class RegistrationLayoutComponent {
  private readonly STUDENT_ID_CREDENTIALS_FORM_STEP = 0;
  private readonly GROUP_VERIFICATION_STEP = 1;

  public activeStep = 1;
  public isBusy = signal(false);
  public prefilledGroupInfo = signal<UserGroupInfoModel | null>({
    faculty: {id: '1',
    name: 'faculty',},
    course: {name: '2',
    id: '2',},
    group: {id: '3',
    name: 'ffffff',}
  });
  public prefilledGroupLookup = signal<GroupLookupModel | null>({
    faculties: [{id: '1', name: 'f1'}, {id: '2', name: 'f2'}, {id: '3', name: 'f3'}],
    groups: [{id: '1', name: 'g1'}, {id: '2', name: 'g2'}, {id: '3', name: 'g3'}],
    courses: [{id: '1', name: 'c1'}, {id: '2', name: 'c2'}, {id: '3', name: 'c3'}]
  })

  constructor(
    private readonly accountApi: AccountApiService,
    private readonly groupInfoApi: GroupInfoApiService,
    private readonly router: Router,
    private readonly appRouteService: AppRoutesService
  ){}

  public getStepStageState(stepIndex: number) : StepStageState {
    if(stepIndex === this.activeStep){
      return 'active';
    } else if (stepIndex < this.activeStep) {
      return 'passed';
    }

    return;
  }

  public onStudentIdFormSubmit(creds: StudentIdCredentialsModel){
    this.isBusy.set(true);

    const subscription = this.accountApi.updateStudentIdCredentials(creds)
      .subscribe({
        next: (res) => {
          subscription.unsubscribe();

          this.handleStudentIdCredentialsResponse(res);
        }
      });    
  }

  public onGroupInfoFormSubmit(groupInfo: UserGroupInfoModel){
    this.isBusy.set(true);
    
    const subscription = this.accountApi.updateGroupInfo(groupInfo)
      .subscribe(() => {
        subscription.unsubscribe();

        this.isBusy.set(false);
        this.router.navigate(this.appRouteService.homeUrl)
      })
  }

  private handleStudentIdCredentialsResponse(groupInfo: UserGroupInfoModel){
    this.prefilledGroupInfo.set(groupInfo);

    const subscription = this.groupInfoApi.getGroupLookup(groupInfo.faculty.id, groupInfo.course.id)
      .subscribe({
          next: (lookup) => {
            this.isBusy.set(false);
            this.prefilledGroupLookup.set(lookup);
            this.activeStep = this.GROUP_VERIFICATION_STEP;
            
            subscription.unsubscribe();
          }
      })
  }
}
