import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-step-stage',
  templateUrl: './step-stage.component.html',
  styleUrl: './step-stage.component.scss'
})
export class StepStageComponent {
  icon = input.required<string>();
  state = input.required<'active' | 'passed' | undefined>();
  disabled = input(false);
  click = output();

  onClick(){
    this.click.emit();
  }
}
