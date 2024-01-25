import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private successAlert: boolean = false;
  private errorAlert: boolean = false;

  constructor(private userService: UserService) {}

  save(form: FormGroup){
    if (form.valid){
    this.userService.save(form.value);
    this.onSuccess();
    } else {
      this.onError();
    }
  }

  onSuccess(){
    this.successAlert = true;
    this.errorAlert = false;
  }

  onError(){
    this.errorAlert = true;
    this.successAlert = false;
  }

  getSuccessAlert(){
    return this.successAlert;
  }

  getErrorAlert(){
    return this.errorAlert;
  }
}