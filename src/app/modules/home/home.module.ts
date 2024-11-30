import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.route';
import { HomeComponent } from './components/home/home.component';
import { AppSharedModule } from '../../components/app-shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    AppSharedModule,
    RouterModule.forChild(HomeRoutes)
  ]
})
export class HomeModule {}
