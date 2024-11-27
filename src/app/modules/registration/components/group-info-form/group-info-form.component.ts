import { Component, computed, DestroyRef, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../../../types/groupInfo/course.model';
import { GroupModel } from '../../../../types/groupInfo/group.model';
import { FacultyModel } from '../../../../types/groupInfo/faculty.model';
import { UserGroupInfoModel } from '../../../../types/groupInfo/userGroupInfo.model';
import { GroupLookupModel } from '../../../../types/groupInfo/group-lookup.model';
import { LookupItem } from '../../../../types/lookup.model';
import { GroupInfoApiService } from '../../../../services/api/group-info.api';
import { distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-group-info-form',
  templateUrl: './group-info-form.component.html',
  styleUrl: './group-info-form.component.scss'
})
export class GroupInfoFormComponent implements OnInit{

  constructor(
    private readonly groupInfoApi: GroupInfoApiService,
    private readonly destroyRef: DestroyRef
  ) {}

  public externalErrorMessages = input<string[]>([]);
  public userGroupInfo = input.required<UserGroupInfoModel>();
  public groupLookup = input.required<GroupLookupModel>();
  public isSubmitting = input(false);

  public submit = output<UserGroupInfoModel>();

  public form = new FormGroup({
    course: new FormControl<CourseModel | null>({value: null, disabled: false}, {
      validators: [Validators.required]
    }),
    faculty: new FormControl<FacultyModel | null>({value: null, disabled: true}, {
      validators: [
        Validators.required
    ]}),
    group: new FormControl<GroupModel | null>({value: null, disabled: true}, {
      validators: [
        Validators.required
    ]}),
  });;

  public courses = signal<CourseModel[] | null>(null);
  public groups = signal<GroupModel[] | null>(null);
  public faculties = signal<FacultyModel[] | null>(null);
  public isLookupLoading = signal(false);
  public isEditMode = signal(false);

  public submitIsDisabled = computed(() => this.isLookupLoading() || this.isSubmitting());

  public errors = computed(() => this.externalErrorMessages().map(msg => ({
    severity: 'error',
    detail: msg
  })));

  ngOnInit(): void {
    this.applyGroupLookup(this.groupLookup());
    this.form.patchValue({
      ...this.userGroupInfo()
    })
    this.form.disable();

    const facultyChangesSubscription = this.form.controls.faculty.valueChanges.subscribe((value) => {
      console.log('faculty:', value);
      this.onFacultyChange(value);
    });

    const courseChangesSubscription = this.form.controls.course.valueChanges.subscribe((value) => {
      console.log('course:', value);
      this.onCourseChange(value);
    });
    
    this.destroyRef.onDestroy(() => {
      facultyChangesSubscription.unsubscribe();
      courseChangesSubscription.unsubscribe();
    })
  }

  public onEditClick(){
    this.isEditMode.set(true);
    this.form.enable({emitEvent: false});
  }

  public onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.submit.emit({
      faculty: this.form.controls.faculty.value!,
      group: this.form.controls.group.value!,
      course: this.form.controls.course.value!
    })
  }
  
  private onFacultyChange(faculty: FacultyModel | null){
    if(!faculty){
      return;
    }

    this.loadGroupLookup(faculty.id, this.form.controls.course.value?.id);
  }

  private onCourseChange(course: CourseModel | null){
    if(!course){
      return;
    }

    const selectedFacultyId = this.form.controls.faculty.value?.id;
    
    if(!selectedFacultyId){
      return;
    }

    this.loadGroupLookup(selectedFacultyId, course.id, true);
  }

  private loadGroupLookup(facultyId: string, courseId?: string, updateOnlyGroup = false){
    this.form.disable({ emitEvent: false });
    this.isLookupLoading.set(true);
    
    const subscription = this.groupInfoApi.getGroupLookup(facultyId, courseId)
      .subscribe((lookup) => {
        this.applyGroupLookup(lookup, updateOnlyGroup);
        this.isLookupLoading.set(false);
        this.form.enable({ emitEvent: false });
        subscription.unsubscribe();
      });
  }

  private applyGroupLookup(lookup: GroupLookupModel, updateOnlyGroup = false){
    this.faculties.set(lookup.faculties);

    if(!updateOnlyGroup){
      this.courses.set(lookup.courses);
      this.form.controls.course.setValue(lookup.courses[0], { emitEvent:false })
    }
    
    this.groups.set(lookup.groups);
    this.form.controls.group.setValue(lookup.groups[0], { emitEvent: false })
  }
}
