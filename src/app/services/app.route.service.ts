import { Injectable } from '@angular/core';
import { ScheduleRoutesService } from '../modules/schedule/services/schedule.route.service';
import { ProfileRoutesService } from '../modules/profile/services/profile.route.service';
import { HomeRoutesService } from '../modules/home/services/home.route.service';
import { GradesRoutesService } from '../modules/grades/services/grades.route.service';

@Injectable({ providedIn: 'root' })
export class AppRoutesService {
  public static readonly APP_ROOT_PATH = '';

  public get rootUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH];
  }

  public get homeUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, HomeRoutesService.ROOT_PATH];
  }

  public get gradesUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, GradesRoutesService.ROOT_PATH];
  }

  public get scheduleUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, ScheduleRoutesService.ROOT_PATH];
  }

  public get profileUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, ProfileRoutesService.ROOT_PATH];
  }
}
