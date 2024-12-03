import { Observable, of, tap } from "rxjs";
import { ScheduleDayModel } from "../../../api/schedule/types/schedule-day.model";
import { ScheduleApiService } from "../../../api/schedule/schedule-api.service";
import { Injectable } from "@angular/core";
import { toISODate } from "../../../utils/dateUtils";

type ScheduleCache = {
  [key: string] : ScheduleDayModel
};

@Injectable()
export class ScheduleService {
  private readonly _scheduleCache: ScheduleCache = {};

  constructor(private readonly _scheduleApiService: ScheduleApiService){}

  public searchByDate(date: Date, forceRefresh = false) : Observable<ScheduleDayModel>{
    if(!forceRefresh){
      const schedule = this._scheduleCache[toISODate(date)];
      if(schedule){
        return of(schedule);
      }
    }

    return this._scheduleApiService.searchByDate(date, forceRefresh).pipe(
      tap(r => this._scheduleCache[toISODate(date)] = r)
    );
  }
}