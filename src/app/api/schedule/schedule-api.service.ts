import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { Observable } from "rxjs";
import { ScheduleDayModel } from "./types/schedule-day.model";
import { toISODate } from "../../utils/dateUtils";

@Injectable({ providedIn: 'root' })
export class ScheduleApiService {

  public static readonly SEARCH_BY_DATE = 'schedule/by-date';
  
  constructor(private readonly _apiService: ApiService) {}

  public searchByDate(date: Date, forceRefresh = false) : Observable<ScheduleDayModel> {
    return this._apiService.get(ScheduleApiService.SEARCH_BY_DATE, {params: { 
      date: toISODate(date), 
      forceRefresh: forceRefresh.toString() 
    }})
  }
}