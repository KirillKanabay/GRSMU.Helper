import { Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { GradesService } from '../../services/grades.service';
import { GradebookModel } from '../../../../api/gradebook/types/gradebook.model';
import { MarkModel } from '../../../../api/gradebook/types/mark.model';
import { MarkActivityType } from '../../../../types/enums/mark-activity-type';

@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrl: './grades-table.component.scss'
})
export class GradesTableComponent implements OnInit {
  private readonly _importantActivityTypes = [
    MarkActivityType.Exam,
    MarkActivityType.Final
  ];
  
  constructor(
    private readonly _gradesService: GradesService,
    private readonly _destroyRef: DestroyRef
  ){}

  public disciplineId = input.required<string>();
  public gradebook = signal<GradebookModel | null>(null);
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getGradebook(false);
  }

  public isImportantMark(mark: MarkModel){
    return this._importantActivityTypes.includes(mark.activityType);
  }

  public onRefreshClick(){
    this.getGradebook(true);
  }
  
  private getGradebook(forceRefresh: boolean){
    this.isLoading.set(true);
    const subscription = this._gradesService.getGradebook(this.disciplineId(), true).subscribe((res) => {
      subscription.unsubscribe();
      this.isLoading.set(false);
      this.gradebook.set(res);
    })

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
