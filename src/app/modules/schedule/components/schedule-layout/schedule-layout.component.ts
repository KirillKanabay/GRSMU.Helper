import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-layout',
  templateUrl: './schedule-layout.component.html',
  styleUrl: './schedule-layout.component.scss',
})
export class ScheduleLayoutComponent {
  public week: Date = new Date(2024, 11, 2);
}
