import { Component, input } from '@angular/core';
import { ScheduleItemModel } from '../../../modules/schedule/types/schedule-item.model';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrl: './schedule-day.component.scss'
})
export class ScheduleDayComponent {
  public scheduleItems = input<ScheduleItemModel[]>([])
  public isLoading = input<boolean>(false);
}
