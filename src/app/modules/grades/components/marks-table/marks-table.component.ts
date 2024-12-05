import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marks-table',
  templateUrl: './marks-table.component.html',
  styleUrl: './marks-table.component.scss'
})
export class MarksTableComponent implements OnInit {
  ngOnInit(): void {
    console.log('hello world!')
  }
  disciplineId = input.required<string>();
  marks = input<{date: string, mark: string}[]>([]);
}
