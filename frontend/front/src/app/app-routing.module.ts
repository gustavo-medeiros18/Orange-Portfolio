import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProjectMobileComponent } from "./screens/view-project-mobile/view-project-mobile.component";
import { NotFoundComponent } from "./screens/not-found/not-found.component";
import { GuardGuard } from "./guard/auth.guard";
import { LoginGuard } from "./guard/login.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "login",
    loadChildren: () =>
      import("./screens/login/login-routing.module").then((m) => m.LoginRoutingModule),
    canActivate: [LoginGuard],
  },
  {
    path: "register",
    loadChildren: () =>
      import("./screens/register/register-routing.module").then((m) => m.RegisterRoutingModule),
    canActivate: [LoginGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./screens/profile/profile-routing.module").then((m) => m.ProfileRoutingModule),
    canActivate: [GuardGuard],
  },
  {
    path: "discover",
    loadChildren: () =>
      import("./screens/discover/discover-routing.module").then((m) => m.DiscoverRoutingModule),
    canActivate: [GuardGuard],
  },
  {
    path: "profile/info",
    loadChildren: () =>
      import("./screens/profile-info/profile-info-routing.module").then((m) => m.ProfileInfoRoutingModule),
    canActivate: [GuardGuard],
  },

  { path: "project", component: ViewProjectMobileComponent, canActivate: [GuardGuard] },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
