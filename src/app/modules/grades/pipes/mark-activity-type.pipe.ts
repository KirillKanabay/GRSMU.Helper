import { Pipe, PipeTransform } from "@angular/core";
import { MarkActivityType } from "../../../types/enums/mark-activity-type";

@Pipe({
  name: 'markActivityType'
})
export class MarkActivityTypePipe implements PipeTransform {
  
  transform(value: MarkActivityType, ...args: any[]) {
    switch(value){
      case MarkActivityType.Practise:
        return 'Практ. занятие';
      case MarkActivityType.Final:
        return 'Итог';
      case MarkActivityType.Test:
        return 'Тестирование';
      case MarkActivityType.HistoryOfDiseases:
        return 'Ист. болезней';
      case MarkActivityType.DifferentiatedExam:
        return 'Диф. зачет';
      case MarkActivityType.Exam:
        return 'Экзамен';
      case MarkActivityType.Seminar:
        return 'Семинар';
      case MarkActivityType.Lecture:
        return 'Лекция';
      case MarkActivityType.Training:
        return 'Учеб. занятие';
      case MarkActivityType.PractiseSkills:
        return 'Практ. навыки';
      default:
        return '';
    }
  }

}