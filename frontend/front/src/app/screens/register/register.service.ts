import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private userService: UserService) {}

  save(form: FormGroup){
    this.userService.save(form.value);
  }
}