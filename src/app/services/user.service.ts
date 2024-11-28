import { Injectable } from "@angular/core";
import { UserApiService } from "./api/user-api.service";
import { UserModel } from "../types/user/user.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(private userApiService: UserApiService) 
  {}

  public getUserInfo(): Observable<UserModel> {
    return this.userApiService.me();
  }
}