import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.route';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(HomeRoutes)
  ]
})
export class HomeModule { }
