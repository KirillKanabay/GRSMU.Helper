import { Component, computed, input, output } from '@angular/core';

export type StepStageState = 'active' | 'passed' | undefined

@Component({
  selector: 'app-step-stage',
  templateUrl: './step-stage.component.html',
  styleUrl: './step-stage.component.scss'
})
export class StepStageComponent {
  icon = input.required<string>();
  state = input.required<StepStageState>();
  disabled = input(false);

  click = output();

  onClick(){
    this.click.emit();
  }
}
