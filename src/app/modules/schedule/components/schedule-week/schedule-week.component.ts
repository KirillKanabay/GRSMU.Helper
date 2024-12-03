import { Component, input, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { addDays, datesAreEqual, incDays, today } from '../../../../utils/dateUtils';
import { DatePipe } from '@angular/common';
import { ScheduleDayModel } from '../../../../api/schedule/types/schedule-day.model';
import { ScheduleService } from '../../services/schedule.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-week',
  templateUrl: './schedule-week.component.html',
  styleUrl: './schedule-week.component.scss'
})
export class ScheduleWeekComponent implements OnInit {
  public startOfWeek = input.required<Date>();
  
  constructor(
    private readonly _datePipe: DatePipe,
    private readonly _scheduleService: ScheduleService
  ) {}

  public scheduleDay = signal<ScheduleDayModel | null>(null);

  public days = signal<MenuItem[]>([]);
  public isLoading = signal<boolean>(false);

  public activeDay: MenuItem | undefined;
  
  ngOnInit(): void {
    const days: MenuItem[] = [];
    const endOfWeek = addDays(this.startOfWeek(), 6);

    for(let day = this.startOfWeek(); day <= endOfWeek; day = incDays(day)){
      days.push({
        label: this._datePipe.transform(day, 'dd/MM')!,
        command: () => this.loadSchedule(day),
        day
      })
    }
    
    const todayDate = today();
    this.activeDay = days.find(d => datesAreEqual(d['day'], todayDate)) ?? days[0];
  
    this.days.set(days);
    this.loadSchedule(this.activeDay['day']);
  }

  public onRefreshClick(){
    this.loadSchedule(this.activeDay!['day'], true);
  }

  private reqSubscription?: Subscription;
  private loadSchedule(day: Date, forceRefresh = false) {
    console.log(day);
    this.reqSubscription?.unsubscribe();
    this.isLoading.set(true);
    
    this.reqSubscription = this._scheduleService.searchByDate(day, forceRefresh)
      .subscribe({
        next: s => {
          this.reqSubscription?.unsubscribe();
          this.scheduleDay.set(s);
          this.isLoading.set(false);
        },
        error: err => {
          if(err.status === 404){
            this.scheduleDay.set(null);
          }
          this.isLoading.set(false);
        }
      })
  }
}
