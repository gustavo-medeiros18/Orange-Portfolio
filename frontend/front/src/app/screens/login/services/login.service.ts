import { Injectable } from "@angular/core";
import { UserService } from "src/app/appServices/user.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private userService: UserService) {}

  authenticate(params: FormData) {
    return this.userService.authenticate(params);
  }
}
