import { NgModule } from "@angular/core";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { FatalErrorPageComponent } from "./pages/fatal-error-page/fatal-error-page.component";
import { HeaderComponent } from "./header/header.component";
import { CardModule } from "primeng/card";
import { TimelineModule } from "primeng/timeline";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [
    NotFoundPageComponent,
    FatalErrorPageComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CardModule,
    TimelineModule,
    SkeletonModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [
    NotFoundPageComponent,
    FatalErrorPageComponent,
    HeaderComponent,
    SpinnerComponent
  ]
})
export class AppSharedModule { }