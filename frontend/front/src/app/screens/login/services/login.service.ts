import { Injectable } from "@angular/core";
import { UserService } from "src/app/appServices/user.service";
import { FormGroup } from "@angular/forms";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private userService: UserService) {}

  authenticate(form: FormGroup) {
    this.userService.authenticate(form.value);
    return of(); // modificar posteriormente para retornar o que vier do userService
  }
}
