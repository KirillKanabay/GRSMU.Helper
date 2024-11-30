import { LookupModel } from "../../types/lookup.model";

export interface FullFacultyLookupModel {
  faculties: LookupModel[],
  groups: LookupModel[],
  courses: LookupModel[]
}