import { NgModule } from "@angular/core";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { FatalErrorPageComponent } from "./pages/fatal-error-page/fatal-error-page.component";

@NgModule({
  declarations: [
    NotFoundPageComponent,
    FatalErrorPageComponent
  ],
  exports: [
    NotFoundPageComponent,
    FatalErrorPageComponent
  ]
})
export class AppSharedModule { }