import { Observable } from "rxjs";
import { UserModel } from "../../types/user/user.model";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserApiService {
  public static readonly ME_ENDPOINT = 'user/me';

  constructor(private readonly _apiService: ApiService) {}

  public me(): Observable<UserModel>{
    return this._apiService.get<UserModel>(UserApiService.ME_ENDPOINT);
  }
}