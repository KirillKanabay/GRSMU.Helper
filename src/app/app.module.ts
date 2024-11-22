import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './modules/layout/layout.module';
import { LayoutComponent } from './modules/layout/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.route';
import { AppSharedModule } from './components/app-shared.module';

@NgModule({
  bootstrap: [LayoutComponent],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    LayoutModule,
    AppSharedModule
  ],
})
export class AppModule {}
