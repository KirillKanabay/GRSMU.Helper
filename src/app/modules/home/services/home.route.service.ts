import { AppRoutesService } from '../../../services/app.route.service';

export class HomeRoutesService {
  public static readonly ROOT_PATH = 'home';

  public get homeUrl(): string[] {
    return [ AppRoutesService.APP_ROOT_PATH, HomeRoutesService.ROOT_PATH ];
  }
}
