import { Component, computed, DestroyRef, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookupModel } from '../../../../api/types/lookup.model';
import { FacultyApiService } from '../../../../api/faculty/faculty-api.service';
import { UserPrefilledFacultyModel } from '../../../../api/user/types/user-prefilled-faculty.model';
import { FullFacultyLookupModel } from '../../../../api/faculty/types/faculty-full-lookup.model';
import { ErrorResponseModel } from '../../../../api/types/error-response.model';
import { UserApiService } from '../../../../api/user/user-api.service';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.scss'
})
export class FacultyFormComponent implements OnInit{

  constructor(
    private readonly _facultyApiService: FacultyApiService,
    private readonly _userApiService: UserApiService,
    private readonly _destroyRef: DestroyRef
  ) {}

  public isSaveFinishing = input.required<boolean>();
  public prefilledFaculty = input.required<UserPrefilledFacultyModel>();
  public formSubmit = output();

  public form = new FormGroup({
    course: new FormControl<LookupModel | null>({value: null, disabled: false}, {
      validators: [Validators.required]
    }),
    faculty: new FormControl<LookupModel | null>({value: null, disabled: true}, {
      validators: [
        Validators.required
    ]}),
    group: new FormControl<LookupModel | null>({value: null, disabled: true}, {
      validators: [
        Validators.required
    ]}),
  });;

  
  public errorMessages = signal<string[]>([]);
  public isSubmitting = signal(false);
  public courses = signal<LookupModel[] | null>(null);
  public groups = signal<LookupModel[] | null>(null);
  public faculties = signal<LookupModel[] | null>(null);
  public isLookupLoading = signal(false);
  public isEditMode = signal(false);

  public isButtonDisabled = computed(() => this.isLookupLoading() || this.isSubmitting() || this.isSaveFinishing());

  public errors = computed(() => this.errorMessages().map(msg => ({
    severity: 'error',
    detail: msg
  })));

  ngOnInit(): void {
    this.form.disable();
    
    const prefilledFaculty = this.prefilledFaculty();

    this.form.patchValue({
      course: { id: prefilledFaculty.courseId, value: prefilledFaculty.courseName },
      faculty: { id: prefilledFaculty.facultyId, value: prefilledFaculty.facultyName },
      group: { id: prefilledFaculty.groupId, value: prefilledFaculty.facultyId }
    }, { emitEvent : false })

    const facultyChangesSubscription = this.form.controls.faculty.valueChanges.subscribe((value) => {
      this.onFacultyChange(value);
    });

    const courseChangesSubscription = this.form.controls.course.valueChanges.subscribe((value) => {
      this.onCourseChange(value);
    });

    this.loadFacultyLookup(prefilledFaculty.facultyId, prefilledFaculty.courseId, false, false);

    this._destroyRef.onDestroy(() => {
      facultyChangesSubscription.unsubscribe();
      courseChangesSubscription.unsubscribe();
    })
  }

  public onEditClick(){
    this.isEditMode.set(true);
    this.form.enable({emitEvent: false});
  }

  public onSubmit(){
    if(!this.form.valid){
      return;
    }

    this.isSubmitting.set(true);
    const { faculty, course, group } = this.form.controls;

    const subscription = this._userApiService.updateFaculty({
      facultyId: faculty.value!.id,
      courseId: course.value!.id,
      groupId: group.value!.id
    }).subscribe({
      next: () => {
        subscription.unsubscribe();
        this.isSubmitting.set(false);
        this.formSubmit.emit();
      },
      error: (err) => {
        subscription.unsubscribe();
        this.handleError(err);
      }
    })
  }
  
  private onFacultyChange(faculty: LookupModel | null){
    if(!faculty){
      return;
    }

    this.loadFacultyLookup(faculty.id, this.form.controls.course.value!.id);
  }

  private onCourseChange(course: LookupModel | null){
    if(!course){
      return;
    }

    this.loadFacultyLookup(this.form.controls.faculty.value!.id, course.id, true);
  }

  private loadFacultyLookup(facultyId: string, courseId: string, updateOnlyGroup = false, enableForm = true){
    this.form.disable({ emitEvent: false });
    this.isLookupLoading.set(true);
    
    const subscription = this._facultyApiService.getFacultyFullLookup(facultyId, courseId)
      .subscribe({
        next: (lookup) => {
          this.applyFacultyLookup(lookup, updateOnlyGroup);
          this.isLookupLoading.set(false);
          if(enableForm){
            this.form.enable({ emitEvent: false });
          }
          subscription.unsubscribe();
        },
        error: (err) => this.handleError(err) 
      });
  }

  private handleError(err: ErrorResponseModel){
    this.isLookupLoading.set(false);
    this.isSubmitting.set(false);
    this.errorMessages.set(err.errors?.map(err => err.description ?? "Неизвестная ошибка") ?? ["Неизвестная ошибка"]);
  }

  private applyFacultyLookup(lookup: FullFacultyLookupModel, updateOnlyGroup = false){
    this.faculties.set(lookup.faculties);
    this.courses.set(lookup.courses);
    this.groups.set(lookup.groups);

    if(!updateOnlyGroup){      
      this.form.controls.course.setValue(lookup.courses[0], { emitEvent:false })
    }
    
    this.form.controls.group.setValue(lookup.groups[0], { emitEvent: false })
  }
}
