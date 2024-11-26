import { Component, DestroyRef, signal } from '@angular/core';
import { AccountApiService } from '../../../../services/api/account-api.service';
import { StudentIdCredentialsModel } from '../../types/student-id-credentials.model';
import { GroupInfo } from '../../../../types/groupInfo.type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly STUDENT_ID_CREDENTIALS_FORM_STEP = 0;
  private readonly GROUP_VERIFICATION_STEP = 1;

  public activeStep = this.STUDENT_ID_CREDENTIALS_FORM_STEP;
  public isBusy = signal(false);
  public prefilledGroupInfo = signal<GroupInfo | null>(null);

  constructor(
    private readonly accountApi: AccountApiService,
    private readonly destroyRef: DestroyRef
  ){}

  onStudentIdFormSubmit(creds: StudentIdCredentialsModel){
    this.isBusy.set(true);

    const subscription = this.accountApi.updateStudentIdCredentials(creds)
      .subscribe({
        next: this.handleStudentIdCredentialsResponse.bind(this)
      });
    
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private handleStudentIdCredentialsResponse(groupInfo: GroupInfo){
    this.isBusy.set(false);
    this.activeStep = this.GROUP_VERIFICATION_STEP;
  }
}
