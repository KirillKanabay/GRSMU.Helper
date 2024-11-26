import { AppRoutesService } from "../../../services/app.route.service"

export class StudentIdSetupRoutesService {
  public static readonly ROOT_PATH = 'student-id-setup'

  public get studentIdSetup(): string[] {
    return [AppRoutesService.APP_ROOT_PATH, StudentIdSetupRoutesService.ROOT_PATH];
  }
}