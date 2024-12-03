import { Component, input, output } from '@angular/core';
import { ScheduleItemModel } from '../../../../api/schedule/types/schedule-item.model';
import { ScheduleDayModel } from '../../../../api/schedule/types/schedule-day.model';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrl: './schedule-day.component.scss'
})
export class ScheduleDayComponent {
  public schedule= input<ScheduleDayModel | null>(null);
  public isLoading = input<boolean>(false);
  public refresh = output();

  public onRefreshClick(){
    this.refresh.emit();
  }
}
