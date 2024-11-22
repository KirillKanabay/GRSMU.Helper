import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.route';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [RouterModule.forChild(ScheduleRoutes)],
})
export class ScheduleModule {}
