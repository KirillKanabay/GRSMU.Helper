import { NgModule } from "@angular/core";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [NotFoundPageComponent, HeaderComponent],
  exports: [NotFoundPageComponent, HeaderComponent]
})
export class AppSharedModule { }