import { Component } from '@angular/core';

@Component({
  selector: 'app-grades-layout',
  templateUrl: './grades-layout.component.html',
  styleUrl: './grades-layout.component.scss'
})
export class GradesLayoutComponent {
  public activeIndex?: number;
  public disciplines = [
    {
      name: 'Анатомия',
      marks: [{
        'mark': '1',
        'date': '12-03-1222'
      },
      {
        'mark': '10',
        'date': '12-03-1222'
      }]
    },
  ]
}
