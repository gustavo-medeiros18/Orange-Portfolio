import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "login"},
  {path: "login", loadChildren: () =>  import ("./screens/login/login-routing.module").then(m => m.LoginRoutingModule)},
  {path: "cadastro", loadChildren: () =>  import ("./screens/cadastro/cadastro-routing.module").then(m => m.CadastroRoutingModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
