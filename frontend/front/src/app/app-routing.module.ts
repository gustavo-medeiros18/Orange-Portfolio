import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProjectMobileComponent } from "./screens/view-project-mobile/view-project-mobile.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "login",
    loadChildren: () =>
      import("./screens/login/login-routing.module").then((m) => m.LoginRoutingModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./screens/register/register-routing.module").then((m) => m.RegisterRoutingModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./screens/profile/profile-routing.module").then((m) => m.ProfileRoutingModule),
  },
  {
    path: "discover",
    loadChildren: () =>
      import("./screens/discover/discover-routing.module").then((m) => m.DiscoverRoutingModule),
  },

  { path: "project", component: ViewProjectMobileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
