import { Injectable } from "@angular/core";
import { UserService } from "src/app/appServices/user.service";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor(private userService: UserService,
    private authService: LoginAppService) {}

  authenticate(form: FormGroup) {
    return this.authService.authUser(form.value);
    //return this.userService.authenticate(form.value);
  }
}
