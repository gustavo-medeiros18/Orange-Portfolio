import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "login", loadChildren: () =>  import ("./screens/login/login-routing.module").then(m => m.LoginRoutingModule)},
  {path: "register", loadChildren: () =>  import ("./screens/register/register-routing.module").then(m => m.CadastroRoutingModule)},
  {path: "profile", loadChildren: () =>  import ("./screens/profile/profile-routing.module").then(m => m.ProfileRoutingModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
