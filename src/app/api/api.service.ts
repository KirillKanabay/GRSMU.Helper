import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpOptions } from "../types/http-options.type";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorResponseModel } from "./types/error-response.model";

@Injectable({ providedIn:'root' })
export class ApiService {

  public static API_ROOT = 'https://r9390nk5-7080.euw.devtunnels.ms/api/';

  constructor(private readonly httpClient: HttpClient)
  {}

  public get<TResponse>(path: string, options: Partial<HttpOptions> = { }): Observable<TResponse>{
    return this.httpClient.get<TResponse>(this.getApiUrl(path), ApiService.createOptions(options))
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public post<TResponse>(path: string, data?:any, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.post<TResponse>(this.getApiUrl(path), data, ApiService.createOptions(options))
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public put<TResponse>(path: string, data?:any, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.put<TResponse>(this.getApiUrl(path), data, ApiService.createOptions(options))
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public delete<TResponse>(path: string, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(this.getApiUrl(path), ApiService.createOptions(options))
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  private getApiUrl(path: string): string{
    return ApiService.API_ROOT + path;
  }

  private handleError(err: any): Observable<never>{
    return throwError(() => err.error 
        ? err.error 
        :{ status: 0, errors: ["Сервер недоступен попробуйте позже!"] });
  }

  private static createOptions(options?: Partial<HttpOptions>): HttpOptions {
    return {
      observe: 'body',
      responseType: 'json',
      ...options
    }
  }
}