import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpOptions } from "../../types/http-options.type";

@Injectable({ providedIn:'root' })
export class ApiService {

  public static API_ROOT = 'https://r9390nk5-7080.euw.devtunnels.ms/api/';

  constructor(private readonly httpClient: HttpClient)
  {}

  public get<TResponse>(path: string, options: Partial<HttpOptions> = {}){
    return this.httpClient.get<TResponse>(this.getApiUrl(path), this.createOptions(options));
  }

  public post<TResponse>(path: string, data?:any, options: Partial<HttpOptions> = {}){
    return this.httpClient.post<TResponse>(this.getApiUrl(path), data, this.createOptions(options));
  }

  private getApiUrl(path: string): string{
    return ApiService.API_ROOT + path;
  }

  private createOptions(options: Partial<HttpOptions>): HttpOptions {
    return {
      observe: 'body',
      responseType: 'json',
      ...options
    }
  }
}