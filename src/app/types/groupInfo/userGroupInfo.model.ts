import { CourseModel } from "./course.model";
import { FacultyModel } from "./faculty.model";
import { GroupModel } from "./group.model";

export interface UserGroupInfoModel {
  faculty: FacultyModel;
  group: GroupModel;
  course: CourseModel;
}