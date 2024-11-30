import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { Observable } from "rxjs";
import { FullFacultyLookupModel } from "./types/faculty-full-lookup.model";
import { LookupModel } from "../types/lookup.model";

@Injectable({ providedIn: 'root' })
export class FacultyApiService {
  
  public static readonly FACULTY_LOOKUP_ENDPOINT = 'faculty/lookup';
  public static readonly FACULTY_FULL_LOOKUP_ENDPOINT = 'faculty/full-lookup';
  
  constructor(
    private readonly apiService: ApiService
  ){}

  public getFacultyLookup():Observable<LookupModel[]>{
    return this.apiService.get<LookupModel[]>(FacultyApiService.FACULTY_LOOKUP_ENDPOINT);
  }

  public getFacultyFullLookup(facultyId: string, courseId: string):Observable<FullFacultyLookupModel>{
    return this.apiService.get<FullFacultyLookupModel>(FacultyApiService.FACULTY_FULL_LOOKUP_ENDPOINT, { params: { facultyId, courseId }});
  }
}