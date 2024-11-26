import { Injectable } from "@angular/core";
import { AppRoutesService } from "../../../services/app.route.service"

@Injectable({ providedIn:'root' })
export class RegistrationRoutesService {
  public static readonly ROOT_PATH = 'registration'

  public get studentIdSetup(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, RegistrationRoutesService.ROOT_PATH];
  }
}