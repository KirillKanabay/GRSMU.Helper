import { NgModule, OnInit } from '@angular/core';
import { AppMainLayoutComponent } from './app-main-layout/app-main-layout.component';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgClass } from '@angular/common';
import { ScreenLoaderComponent } from './screen-loader/screen-loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppMainLayoutComponent, 
    NavComponent, 
    ScreenLoaderComponent],
  exports: [AppMainLayoutComponent],
  imports: [
    RouterOutlet, 
    TabMenuModule, 
    NgClass,
    ProgressSpinnerModule],
})
export class AppMainLayoutModule {
  
}
