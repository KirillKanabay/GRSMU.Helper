import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, timeout } from "rxjs";
import { UserGroupInfoModel } from "../../types/groupInfo/userGroupInfo.model";
import { StudentIdCredentialsModel } from "../../modules/registration/types/student-id-credentials.model";

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private readonly httpClient: HttpClient)
  {}

  public updateStudentIdCredentials(studentIdCredentials: StudentIdCredentialsModel) : Observable<UserGroupInfoModel>{
    return of({
      faculty: {id: '1',
      name: 'faculty',},
      course: {name: '2',
      id: '2',},
      group: {id: '3',
      name: 'ffffff',}
    }).pipe(
      delay(2000)
    )
  }

  public updateGroupInfo(groupInfo: UserGroupInfoModel) : Observable<{}>{
    return of({}).pipe(delay(2000));
  }
}