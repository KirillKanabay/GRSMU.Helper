import { Observable } from "rxjs";
import { UserModel } from "./types/user.model";
import { ApiService } from "../api.service";
import { Injectable } from "@angular/core";
import { StudentIdCredentialsModel } from "../../modules/registration/types/student-id-credentials.model";
import { UserPrefilledFacultyModel } from "./types/user-prefilled-faculty.model";
import { UserFacultyModel } from "./types/user-faculty.model";
import { EmptyResponseModel } from "../types/empty-response.model";

@Injectable({ providedIn: 'root' })
export class UserApiService {

  public static readonly ME_ENDPOINT = 'user/me';
  public static readonly UPDATE_STUDENT_ID_ENDPOINT = 'user/student-card-id';
  public static readonly UPDATE_FACULTY_ENDPOINT = 'user/student-faculty';

  constructor(private readonly _apiService: ApiService) {}

  public me(): Observable<UserModel>{
    return this._apiService.get<UserModel>(UserApiService.ME_ENDPOINT);
  }

  public updateStudentCardId(creds: StudentIdCredentialsModel): Observable<UserPrefilledFacultyModel>{
    return this._apiService.put<UserPrefilledFacultyModel>(UserApiService.UPDATE_STUDENT_ID_ENDPOINT, creds);
  }

  public updateFaculty(faculty: UserFacultyModel): Observable<EmptyResponseModel>{
    return this._apiService.put<EmptyResponseModel>(UserApiService.UPDATE_FACULTY_ENDPOINT, faculty);
  }
}