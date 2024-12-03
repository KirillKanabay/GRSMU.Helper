import { NgModule } from '@angular/core';
import { ScheduleLayoutComponent } from './components/schedule-layout/schedule-layout.component';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.route';
import { AppSharedModule } from '../../components/app-shared.module';
import { ScheduleWeekComponent } from './components/schedule-week/schedule-week.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { DatePipe } from '@angular/common';
import { ScheduleService } from './services/schedule.service';
import { ScheduleDayComponent } from './components/schedule-day/schedule-day.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ScheduleNotFoundComponent } from './components/schedule-not-found/schedule-not-found.component';

@NgModule({
  declarations: [
    ScheduleLayoutComponent,
    ScheduleWeekComponent,
    ScheduleDayComponent,
    ScheduleItemComponent,
    ScheduleNotFoundComponent
  ],
  imports: [
    RouterModule.forChild(ScheduleRoutes), 
    TabMenuModule,
    AppSharedModule,
    DatePipe,
    ButtonModule,
    TimelineModule,
    SkeletonModule,
    CardModule
  ],
  exports: [ScheduleLayoutComponent],
  providers: [DatePipe, ScheduleService]
})
export class ScheduleModule {}
