import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMainLayoutModule } from './modules/app-main-layout/app-main-layout.module';
import { AppMainLayoutComponent } from './modules/app-main-layout/app-main-layout/app-main-layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.route';
import { AppSharedModule } from './components/app-shared.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  bootstrap: [AppMainLayoutComponent],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    AppMainLayoutModule,
    AppSharedModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
})
export class AppModule {}
