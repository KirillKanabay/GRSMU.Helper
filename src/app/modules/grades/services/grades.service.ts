import { Injectable } from "@angular/core";
import { GradebookApiService } from "../../../api/gradebook/gradebook-api.service";
import { Observable, of, Subscription, tap } from "rxjs";
import { GradebookModel } from "../../../api/gradebook/types/gradebook.model";

type GradebookCache = {
  [key: string] : GradebookModel
};

@Injectable()
export class GradesService{
  private readonly _gradebookCache: GradebookCache = {};
  
  constructor(
    private readonly _gradebookApiService: GradebookApiService
  ) {}

  public getGradebook(disciplineId: string, forceRefresh: boolean) : Observable<GradebookModel>{
    if(!forceRefresh){
      const gradebook = this._gradebookCache[disciplineId];
      if(gradebook){
        return of(gradebook);
      }
    }

    const subscription = this._gradebookApiService.getGradebook(disciplineId, forceRefresh).pipe(
      tap(r => this._gradebookCache[disciplineId] = r)
    )

    return subscription;
  }
}