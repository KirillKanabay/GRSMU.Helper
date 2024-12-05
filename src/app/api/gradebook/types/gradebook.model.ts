import { MarkModel } from "./mark.model";

export interface GradebookModel {
  discipline: string;
  marks: MarkModel[];
  currentAverageMark: string;
  totalAverageMark: string;
  examMark: string;
}