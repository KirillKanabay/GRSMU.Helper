import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, NavComponent],
  exports: [LayoutComponent],
  imports: [RouterOutlet],
})
export class LayoutModule {}
