import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { UserService } from "src/app/appServices/user.service";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private userService: UserService) {}

  save(form: FormGroup) {
    this.userService.save(form.value);
    return of(); // modificar posteriormente para retornar o que vier do userService
  }
}
