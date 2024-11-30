import { Component } from '@angular/core';
import { ScheduleItemModel } from '../../../schedule/types/schedule-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public items: ScheduleItemModel[] = [
    {
      timeFrom: '09:30',
      timeTo: '10:30',
      subject: 'сем.зан. История белорусской государственности',
      teacher: 'зав.каф. Ситкевич С.А.',
      room: 'ауд. 419, Горького, 80',
      subGroup: 'Подгруппа 2'
    },
    {
      timeFrom: '09:30',
      timeTo: '10:30',
      subject: 'сем.зан. История белорусской государственности',
      teacher: 'зав.каф. Ситкевич С.А.',
      room: 'ауд. 419, Горького, 80',
      subGroup: 'Подгруппа 1'
    },
    {
      timeFrom: '09:30',
      timeTo: '10:30',
      subject: 'сем.зан. История белорусской государственности',
      teacher: 'зав.каф. Ситкевич С.А.',
      room: 'ауд. 419, Горького, 80',
      subGroup: 'Подгруппа 2'
    },
    {
      timeFrom: '09:30',
      timeTo: '10:30',
      subject: 'сем.зан. История белорусской государственности',
      teacher: 'зав.каф. Ситкевич С.А.',
      room: 'ауд. 419, Горького, 80',
      subGroup: 'Подгруппа 1'
    }
  ];
}
