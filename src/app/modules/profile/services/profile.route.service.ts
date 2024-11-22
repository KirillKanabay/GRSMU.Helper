import { Injectable } from '@angular/core';
import { AppRoutesService } from '../../../services/app.route.service';

@Injectable({ providedIn: 'root' })
export class ProfileRoutesService {
  public static readonly ROOT_PATH = 'profile';

  public get profileUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, ProfileRoutesService.ROOT_PATH];
  }
}
