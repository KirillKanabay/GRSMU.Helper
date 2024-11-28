import { Injectable } from '@angular/core';
import { ScheduleRoutesService } from '../modules/schedule/services/schedule.route.service';
import { ProfileRoutesService } from '../modules/profile/services/profile.route.service';
import { HomeRoutesService } from '../modules/home/services/home.route.service';
import { GradesRoutesService } from '../modules/grades/services/grades.route.service';
import { RegistrationRoutesService } from '../modules/registration/services/registration.route.service';

@Injectable({ providedIn: 'root' })
export class AppRoutesService {
  public static readonly APP_ROOT_PATH = '';
  public static readonly FATAL_ERROR_PATH = 'fatal-error';

  public get rootUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH];
  }

  public get fatalErrorUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, AppRoutesService.FATAL_ERROR_PATH];
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

  public get studentIdSetupUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, RegistrationRoutesService.ROOT_PATH];
  }
}
