import { NgModule } from "@angular/core";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { FatalErrorPageComponent } from "./pages/fatal-error-page/fatal-error-page.component";
import { HeaderComponent } from "./header/header.component";
import { CardModule } from "primeng/card";
import { TimelineModule } from "primeng/timeline";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    NotFoundPageComponent,
    FatalErrorPageComponent,
    HeaderComponent
  ],
  imports: [
    CardModule,
    TimelineModule,
    SkeletonModule,
    ButtonModule,
  ],
  exports: [
    NotFoundPageComponent,
    FatalErrorPageComponent,
    HeaderComponent,
  ]
})
export class AppSharedModule { }