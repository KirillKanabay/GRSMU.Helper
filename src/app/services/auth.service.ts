import { Injectable, signal } from '@angular/core';
import { TelegramService } from './telegram.service';
import { BehaviorSubject, map, Observable, tap, throwError, catchError, switchMap } from 'rxjs';
import { AccountModel } from '../types/account/account.model';
import { ApiService } from './api/api.service';
import { TokenModel } from '../types/token.model';
import { AppUserFactory } from '../factories/app-user.factory';
import { AppRoutesService } from './app.route.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public static readonly AUTHORIZE_ENDPOINT = 'account/tg-auth';
  public static readonly REFRESH_ENDPOINT = 'account/refresh-token';

  private appUser$ = new BehaviorSubject<AccountModel | null>(null);

  public getAppUser(): Observable<AccountModel | null> {
    return this.appUser$.asObservable();
  }

  constructor(
    private readonly _telegramService: TelegramService,
    private readonly _apiService: ApiService,
    private readonly _appUserFactory: AppUserFactory,
    private readonly _router: Router,
    private readonly _appRoutesService: AppRoutesService,
  ) {
    const user = this._appUserFactory.createFromStorage();
    if (user) {
      this.appUser$.next(user);
    }
  }

  public auth(): Observable<AccountModel> {
    const token = this._telegramService.getInitData();
    const chatId = this._telegramService.getChatId();

    return this._apiService.post<TokenModel>(AuthService.AUTHORIZE_ENDPOINT, { token, chatId }).pipe(
      map((token) => this.mapToken(token)),
      tap((user) => this.appUser$.next(user)),
      catchError((err) => this.handleAuthError(err)),
    );
  }

  public refresh(): Observable<AccountModel> {
    const user = this.appUser$.value;
    if (!user || !user.refreshToken || !user.accessTokenUnsafe) {
      return throwError(() => new Error('User or tokens are null'));
    }

    return this._apiService
      .post<TokenModel>(AuthService.REFRESH_ENDPOINT, {
        accessToken: user.accessTokenUnsafe,
        refreshToken: user.refreshToken,
      })
      .pipe(
        map((token) => this.mapToken(token)),
        tap((user) => this.appUser$.next(user)),
        catchError((err) => this.handleRefreshError(err)),
      );
  }

  private mapToken(token: TokenModel): AccountModel {
    const user = this._appUserFactory.createByToken(token);
    if (!user) {
      throw new Error('Failed to create user from token');
    }
    return user;
  }

  private handleRefreshError(err: any): Observable<AccountModel> {
    console.error('Token refresh failed. Trying to auth again...', err);
    return this.auth();
  }

  private handleAuthError(err: any): Observable<AccountModel> {
    this._router.navigate(this._appRoutesService.fatalErrorUrl, { replaceUrl: true });
    return throwError(() => new Error('Authentication failed'));
  }
}
