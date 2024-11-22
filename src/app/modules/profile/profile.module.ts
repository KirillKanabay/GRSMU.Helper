import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.route';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ProfileRoutes)
  ]
})
export class ProfileModule { }
