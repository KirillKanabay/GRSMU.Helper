import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: any;
  responseType?: any;
  params?: HttpParams | {
    [param: string] : string | string[]
  };
}