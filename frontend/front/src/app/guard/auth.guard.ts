import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginAppService } from "../appServices/login-app.service";

@Injectable({
  providedIn: "root",
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private loginAppService: LoginAppService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginAppService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
