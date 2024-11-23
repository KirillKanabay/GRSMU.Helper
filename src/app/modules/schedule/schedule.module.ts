import { NgModule } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.route';
import { AppSharedModule } from "../../components/app-shared.module";

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild(ScheduleRoutes), AppSharedModule],
})
export class ScheduleModule {}
