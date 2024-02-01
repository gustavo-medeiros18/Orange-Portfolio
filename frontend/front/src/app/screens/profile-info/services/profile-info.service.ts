import { Injectable } from '@angular/core';
import { UserService } from 'src/app/appServices/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private userService: UserService) { }


  updatePasswordService(id: string,currentPassword: string, newPassword: string) {

  }

}
