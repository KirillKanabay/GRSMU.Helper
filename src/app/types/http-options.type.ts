import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: 'body';
  responseType?: 'json';
  params?: HttpParams | {
    [param: string] : string | string[]
  };
}