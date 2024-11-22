import { Injectable } from "@angular/core";
import { AppRoutesService } from "../../../services/app.route.service";

@Injectable({providedIn: 'root'})
export class GradesRoutesService {
  public static readonly ROOT_PATH = 'grades';

  public get gradesUrl(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, GradesRoutesService.ROOT_PATH];
  }
}