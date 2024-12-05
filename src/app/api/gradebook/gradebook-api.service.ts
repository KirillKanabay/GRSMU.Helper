import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { Observable } from "rxjs";
import { GradebookModel } from "./types/gradebook.model";
import { LookupModel } from "../types/lookup.model";

@Injectable({providedIn: 'root'})
export class GradebookApiService{
  public static readonly GET_GRADEBOOK_ENDPOINT = 'gradebook';
  public static readonly GRADEBOOK_LOOKUP_ENDPOINT = 'gradebook/discipline/lookup'

  constructor(private readonly _apiService: ApiService){}

  public getGradebook(disciplineId: string, force: boolean) : Observable<GradebookModel>{
    return this._apiService.get<GradebookModel>(GradebookApiService.GET_GRADEBOOK_ENDPOINT, {
      params: { disciplineId, force: force.toString() }
    })
  }

  public getDisciplineLookup(searchQuery: string) : Observable<LookupModel[]>{
    return this._apiService.get<LookupModel[]>(GradebookApiService.GRADEBOOK_LOOKUP_ENDPOINT, { params: { searchQuery } });
  }

}