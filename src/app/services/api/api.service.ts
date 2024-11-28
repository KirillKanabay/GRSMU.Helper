import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpOptions } from "../../types/http-options.type";
import { Observable } from "rxjs";

@Injectable({ providedIn:'root' })
export class ApiService {

  public static API_ROOT = 'https://r9390nk5-7080.euw.devtunnels.ms/api/';

  constructor(private readonly httpClient: HttpClient)
  {}

  public get<TResponse>(path: string, options: Partial<HttpOptions> = { }): Observable<TResponse>{
    return this.httpClient.get<TResponse>(this.getApiUrl(path), ApiService.createOptions(options));
  }

  public post<TResponse>(path: string, data?:any, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.post<TResponse>(this.getApiUrl(path), data, ApiService.createOptions(options));
  }

  public put<TResponse>(path: string, data?:any, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.put<TResponse>(this.getApiUrl(path), data, ApiService.createOptions(options));
  }

  public delete<TResponse>(path: string, options: Partial<HttpOptions> = {}): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(this.getApiUrl(path), ApiService.createOptions(options));
  }

  private getApiUrl(path: string): string{
    return ApiService.API_ROOT + path;
  }

  private static createOptions(options?: Partial<HttpOptions>): HttpOptions {
    return {
      observe: 'body',
      responseType: 'json',
      ...options
    }
  }
}