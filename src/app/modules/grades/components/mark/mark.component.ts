import { Component, computed, input } from '@angular/core';
import { MarkModel } from '../../../../api/gradebook/types/mark.model';
import { MarkType } from '../../../../types/enums/mark-type.enum';

type TagSeverity = 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined;

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.scss'
})
export class MarkComponent {
  private readonly _markTypes = [
    MarkType.None,
    MarkType.DefaultMark,
    MarkType.SeriousWorkOutMark,
    MarkType.NotSeriousWorkOutMark
  ];

  public mark = input.required<MarkModel>();
  public markType = computed(() => this.mark().type);
  public isText = computed(() => this._markTypes.includes(this.markType()));


  public getMarkStyle() : string{
    switch(this.markType()){
      case MarkType.SeriousWorkOutMark:
        return 'mark--green';
      case MarkType.NotSeriousWorkOutMark:
        return 'mark--red';
      default:
        return 'mark'
    }
  }

  public getTagSeverity() : TagSeverity{
    switch(this.markType()){
      case MarkType.UnknownAbsence:
        return 'warning';
      case MarkType.SeriousAbsence:
        return 'success';
      case MarkType.NotSeriousAbsence:
        return 'danger';
      case MarkType.SeriousAbsenceWithoutRepeatVisit:
        return 'info';
      case MarkType.LecturePassed:
        return 'success';
      case MarkType.LectureFail:
        return 'danger';                    
      default:
        return 'secondary'
    }
  }
}
