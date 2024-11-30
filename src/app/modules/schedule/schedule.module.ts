import { NgModule } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.route';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [RouterModule.forChild(ScheduleRoutes)],
  exports: [ScheduleComponent]
})
export class ScheduleModule {}
