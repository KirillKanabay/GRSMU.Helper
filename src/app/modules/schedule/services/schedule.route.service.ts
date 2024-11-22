import { Injectable } from '@angular/core';
import { AppRoutesService } from '../../../services/app.route.service';

@Injectable({ providedIn: 'root' })
export class ScheduleRoutesService {
  public static readonly ROOT_PATH = 'schedule';

  public get scheduleUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, ScheduleRoutesService.ROOT_PATH];
  }
}
