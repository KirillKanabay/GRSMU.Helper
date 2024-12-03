import { Component, input } from '@angular/core';
import { ScheduleItemModel } from '../../../../api/schedule/types/schedule-item.model';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss'
})
export class ScheduleItemComponent {
  public subject = input<ScheduleItemModel>();
}
