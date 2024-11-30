import { Component, computed, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookupModel } from '../../../../api/types/lookup.model';
import { UserPrefilledFacultyModel } from '../../../../api/user/types/user-prefilled-faculty.model';
import { UserApiService } from '../../../../api/user/user-api.service';
import { ErrorResponseModel } from '../../../../api/types/error-response.model';
import { FacultyApiService } from '../../../../api/faculty/faculty-api.service';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrl: './credentials-form.component.scss'
})
export class CredentialsFormComponent implements OnInit {

  constructor(
    private readonly _userApiService: UserApiService,
    private readonly _facultyApiService: FacultyApiService
  ) { }

  public formSubmit = output<UserPrefilledFacultyModel>();
  
  public form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}-\d{5}$/)
    ]),
    faculty: new FormControl<LookupModel | null>(null, Validators.required)
  });

  public isSubmitting = signal(false);
  public faculties = signal<LookupModel[]>([]);
  public errorMessages = signal<string[]>([]);
  public isLookupLoading = signal(false);

  public errors = computed(() => this.errorMessages().map(msg => ({
    severity: 'error',
    detail: msg
  })));

  ngOnInit(): void {
    this.isLookupLoading.set(true);

    const subscription = this._facultyApiService.getFacultyLookup()
      .subscribe({
        next: (lookup) => {
          subscription.unsubscribe();
          this.faculties.set(lookup)
          this.form.controls.faculty.setValue(lookup[0]);
          this.isLookupLoading.set(false);
        },
        error: (err) => {
          subscription.unsubscribe();
          this.handleError(err)
        }
      })
    
  }

  public onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.isSubmitting.set(true);

    const subscription = this._userApiService.updateStudentCardId({
      login: this.form.controls.login.value!,
      password: this.form.controls.password.value!,
      facultyId: this.form.controls.faculty.value!.id
    }).subscribe({
      next: (res) => {
        console.log('next handled', res);
        subscription.unsubscribe();
        this.handleUpdateResponse(res);
      },
      error: (err) => {
        subscription.unsubscribe();
        this.handleError(err);
      }
    });
  }

  private handleUpdateResponse(res: UserPrefilledFacultyModel) {
    console.log('ok:', res);
    this.isSubmitting.set(false);
    this.formSubmit.emit(res);
  }

  private handleError(err: ErrorResponseModel){
    console.log(err);
    this.isLookupLoading.set(false);
    this.isSubmitting.set(false);
    this.errorMessages.set(err.errors?.map(err => err.description ?? "Неизвестная ошибка") ?? ["Неизвестная ошибка"]);
  }
}
