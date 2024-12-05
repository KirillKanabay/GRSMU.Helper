import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GradesRoutes } from './grades.route';
import { GradesLayoutComponent } from './components/grades-layout/grades-layout.component';
import { MarksTableComponent } from './components/marks-table/marks-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    GradesLayoutComponent,
    MarksTableComponent
  ],
  imports: [
    RouterModule.forChild(GradesRoutes),
    TableModule,
    ButtonModule,
    AccordionModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ReactiveFormsModule,
    SkeletonModule,
    ProgressSpinnerModule
  ]
})
export class GradesModule { }
