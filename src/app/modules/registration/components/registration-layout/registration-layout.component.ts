import { Component, DestroyRef, signal } from '@angular/core';
import { StepStageState } from '../step-stage/step-stage.component';
import { UserPrefilledFacultyModel } from '../../../../api/user/types/user-prefilled-faculty.model';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { switchMap } from 'rxjs';
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

  public activeStep = this.STUDENT_ID_CREDENTIALS_FORM_STEP;
  public prefilledFaculty= signal<UserPrefilledFacultyModel | null>(null);
  public isSaveFinishing = signal<boolean>(false);

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _appRoutesService: AppRoutesService
  ){}

  public getStepStageState(stepIndex: number) : StepStageState {
    if(stepIndex === this.activeStep){
      return 'active';
    } else if (stepIndex < this.activeStep) {
      return 'passed';
    }

    return;
  }

  public onStudentIdFormSubmit(prefilledFaculty: UserPrefilledFacultyModel){
    this.prefilledFaculty.set(prefilledFaculty);
    this.activeStep = this.GROUP_VERIFICATION_STEP;
  }

  public onFacultyFormSubmit(){
    this.isSaveFinishing.set(true);
    
    const subscription = this._authService.auth()
    .pipe(
      switchMap(() => this._userService.refreshUser())
    )
    .subscribe(() => {
      subscription.unsubscribe();
      this._router.navigate(this._appRoutesService.homeUrl, {replaceUrl: true});
      this.isSaveFinishing.set(false);
    })
  }
}
