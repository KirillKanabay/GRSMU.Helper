import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, NavComponent],
  exports: [LayoutComponent],
  imports: [RouterOutlet],
})
export class LayoutModule {}
