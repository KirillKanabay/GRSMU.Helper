import { Injectable } from "@angular/core";
import { UserApiService } from "../api/user/user-api.service";
import { UserModel } from "../api/user/types/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  
  private readonly user$ = new BehaviorSubject<UserModel | null>(null);

  constructor(private userApiService: UserApiService) 
  {}

  public get user(): Observable<UserModel | null> {
    return this.user$.asObservable();
  }

  public refreshUser(): Observable<UserModel> {
    return this.userApiService.me().pipe(
      tap((user) => this.user$.next(user))
    );
  }
}