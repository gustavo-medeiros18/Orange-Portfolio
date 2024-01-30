import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginAppService } from "../appServices/login-app.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginAppService: LoginAppService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginAppService.isUserLoggedIn()) {
      this.router.navigate(["/profile"]);
      return false;
    } else {
      return true;
    }
  }
}
