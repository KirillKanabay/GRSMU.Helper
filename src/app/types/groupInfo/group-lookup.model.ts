import { CourseModel } from "./course.model";
import { FacultyModel } from "./faculty.model";
import { GroupModel } from "./group.model";

export interface GroupLookupModel {
  faculties: FacultyModel[],
  groups: GroupModel[],
  courses: CourseModel[]
}