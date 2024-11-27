import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { delay, Observable, of, timeout } from "rxjs";
import { GroupLookupModel } from "../../types/groupInfo/group-lookup.model";

@Injectable({'providedIn' : 'root'})
export class GroupInfoApiService {
  constructor(
    private readonly apiService: ApiService
  ){}

  public getGroupLookup(facultyId: string, courseId?: string):Observable<GroupLookupModel>{
    return of({
      faculties: [{id: '1', name: 'f1'}, {id: '2', name: 'f2'}, {id: '3', name: 'f3'}],
      groups: [{id: '1', name: 'g1'}, {id: '2', name: 'g2'}, {id: '3', name: 'g3'}],
      courses: [{id: '1', name: 'c1'}, {id: '2', name: 'c2'}, {id: '3', name: 'c3'}]
    }).pipe(
      delay(2000)
    )
  }
}