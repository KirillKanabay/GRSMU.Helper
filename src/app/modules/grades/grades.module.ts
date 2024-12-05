import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GradesRoutes } from './grades.route';
import { GradesLayoutComponent } from './components/grades-layout/grades-layout.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GradesService } from './services/grades.service';
import { GradesTableComponent } from './components/grades-table/grades-table.component';
import { AppSharedModule } from '../../components/app-shared.module';
import { DatePipe } from '@angular/common';
import { MarkActivityTypePipe } from './pipes/mark-activity-type.pipe';
import { MarkComponent } from './components/mark/mark.component';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    GradesLayoutComponent,
    GradesTableComponent,
    MarkActivityTypePipe,
    MarkComponent
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
    ProgressSpinnerModule,
    AppSharedModule,
    DatePipe,
    TagModule
  ],
  providers: [
    GradesService
  ]
})
export class GradesModule { }
