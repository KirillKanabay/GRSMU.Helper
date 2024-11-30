import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, exhaustMap, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { AccountModel } from "../types/account/account.model";
import { Router } from "@angular/router";
import { AppRoutesService } from "../services/app.route.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _appRoutesService: AppRoutesService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted request', req);
    if(req.url.includes(AuthService.AUTHORIZE_ENDPOINT) || req.url.includes(AuthService.REFRESH_ENDPOINT)){
      return next.handle(req);
    }

    return this._authService.getAppUser().pipe(
      take(1),
      exhaustMap(user => this.executeRequestWithUser(req, next, user, false))
    )
  }

  private executeRequestWithUser(
    req: HttpRequest<any>,
    next: HttpHandler,
    user: AccountModel | null,
    tokenRefreshed: boolean,
  ) : Observable<HttpEvent<any>>{
    console.log(user);

    const isAuthenticated = user && user.accessToken;

    const modifiedReq = isAuthenticated ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }) : req;

    return next.handle(modifiedReq).pipe(
      catchError((error) => this.catchRequestError(error, req, next, user, tokenRefreshed))
    );
  }

  private catchRequestError(
    err: any,
    req: HttpRequest<any>,
    next: HttpHandler,
    user: AccountModel | null,
    tokenRefreshed: boolean
  ) : Observable<HttpEvent<any>> {
    if (err.status !== 401) {
      return throwError(() => err);
    }

    if (tokenRefreshed){
      this._router.navigate(this._appRoutesService.fatalErrorUrl);
      return throwError(() => new Error('Token refresh failed'));
    }

    if(!user?.refreshToken){
      return this._authService.auth().pipe(
        switchMap(authUser => this.executeRequestWithUser(req, next, authUser, true))
      );
    }

    return this._authService.refresh().pipe(
      switchMap(refreshedUser => this.executeRequestWithUser(req, next, refreshedUser, true))
    );
  }
}