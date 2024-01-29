import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "src/app/appServices/user.service";
import { IUserRegister } from "src/app/models/iUserRegister";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private userService: UserService) {}

  save(params: IUserRegister): Observable<IUserRegister> {
    return this.userService.save(params);
  }
}
