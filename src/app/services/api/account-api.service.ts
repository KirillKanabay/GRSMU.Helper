import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, timeout } from "rxjs";
import { GroupInfo } from "../../types/groupInfo.type";
import { StudentIdCredentialsModel } from "../../modules/registration/types/student-id-credentials.model";

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private readonly httpClient: HttpClient)
  {}

  public updateStudentIdCredentials(studentIdCredentials: StudentIdCredentialsModel) : Observable<GroupInfo>{
    return of({
      facultyId: '1',
      facultyName: 'faculty',
      courseName: '2',
      courseId: '2',
      groupId: '3',
      groupName: 'ffffff',
    }).pipe(
      timeout(1000)
    )
  }
}