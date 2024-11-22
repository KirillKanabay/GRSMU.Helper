import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GradesRoutes } from './grades.route';
import { GradesComponent } from './components/grades/grades.component';



@NgModule({
  declarations: [GradesComponent],
  imports: [
    RouterModule.forChild(GradesRoutes)
  ]
})
export class GradesModule { }
