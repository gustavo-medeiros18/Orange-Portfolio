import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginAppService } from "src/app/appServices/login-app.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor( private authService: LoginAppService) {}

  authenticate(form: FormGroup) {
    return this.authService.authUser(form.value);
  }
}
