import { MarkActivityType } from "../../../types/enums/mark-activity-type";
import { MarkType } from "../../../types/enums/mark-type.enum";

export interface MarkModel{
  parsedDate: Date;
  date: string;
  mark: string;
  type: MarkType,
  activityType: MarkActivityType
}