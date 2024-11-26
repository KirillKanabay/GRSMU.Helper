import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn:'root' })
export class ApiService {

  public static API_ROOT = 'https://r9390nk5-7080.euw.devtunnels.ms/api/';

  constructor(private readonly httpClient: HttpClient)
  {}

  public get<TResponse>(path: string){
    return this.httpClient.get<TResponse>(this.getApiUrl(path));
  }

  public post<TResponse>(path: string, data?:any){
    return this.httpClient.post<TResponse>(this.getApiUrl(path), data);
  }

  private getApiUrl(path: string): string{
    return ApiService.API_ROOT + path;
  }
}