import { Routes } from "@angular/router";
import { AppRoutesService } from "./services/app.route.service";
import { HomeRoutesService } from "./modules/home/services/home.route.service";
import { ScheduleRoutesService } from "./modules/schedule/services/schedule.route.service";
import { GradesRoutesService } from "./modules/grades/services/grades.route.service";
import { ProfileRoutesService } from "./modules/profile/services/profile.route.service";
import { NotFoundPageComponent } from "./components/pages/not-found-page/not-found-page.component";
import { StudentIdSetupRoutesService } from "./modules/student-id-setup/services/student-id-setup.route.service";

export const AppRoutes: Routes = [
  { path: '', redirectTo: HomeRoutesService.ROOT_PATH, pathMatch: 'full' },
  { path: AppRoutesService.APP_ROOT_PATH, children: [
    {
      path: HomeRoutesService.ROOT_PATH,
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
      path: ScheduleRoutesService.ROOT_PATH,
      loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
      path: GradesRoutesService.ROOT_PATH,
      loadChildren: () => import('./modules/grades/grades.module').then(m => m.GradesModule)
    },
    {
      path: ProfileRoutesService.ROOT_PATH,
      loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
  ]},
  { path: StudentIdSetupRoutesService.ROOT_PATH, loadComponent: () => import('./modules/student-id-setup/student-id-setup.module').then(m => m.StudentIdSetupModule) },
  { path: '**', component: NotFoundPageComponent }
]