import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [LayoutComponent, NavComponent],
  exports: [LayoutComponent],
  imports: [RouterOutlet, TabMenuModule, NgClass],
})
export class LayoutModule {}
