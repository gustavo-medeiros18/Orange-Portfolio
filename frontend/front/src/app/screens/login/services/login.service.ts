import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { LoginAppService } from "src/app/appServices/login-app.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor( private authService: LoginAppService) {}

  authenticate(form: FormGroup): Observable<boolean> {
    return this.authService.authUser(form.value);
  }
}
