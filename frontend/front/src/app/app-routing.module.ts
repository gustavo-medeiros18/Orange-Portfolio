import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProjectMobileComponent } from "./screens/view-project-mobile/view-project-mobile.component";
import { NotFoundComponent } from "./screens/not-found/not-found.component";

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
  {
    path: "profile/info",
    loadChildren: () =>
      import("./screens/profile-info/profile-info-routing.module").then((m) => m.ProfileInfoRoutingModule),
  },

  { path: "project", component: ViewProjectMobileComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
