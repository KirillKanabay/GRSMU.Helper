import { ScheduleItemModel } from "./schedule-item.model";

export interface ScheduleDayModel {
  day: string;
  date: Date;
  week: Date;
  items: ScheduleItemModel[];
}