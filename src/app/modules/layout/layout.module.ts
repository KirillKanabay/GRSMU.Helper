import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LayoutComponent, NavComponent],
  exports: [LayoutComponent],
  imports: [RouterOutlet, ButtonModule],
})
export class LayoutModule {}
