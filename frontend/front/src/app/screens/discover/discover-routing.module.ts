import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscoverComponent } from "./discover.component";
import { ViewProjectMobileComponent } from "../view-project-mobile/view-project-mobile.component";

const routes: Routes = [
  { path: "", component: DiscoverComponent },

  { path: "project/:id", component: ViewProjectMobileComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverRoutingModule {}
