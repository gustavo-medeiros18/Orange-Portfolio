import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/appServices/user.service';
import { IUserUpdate } from 'src/app/models/iUserUpdate';
import { IUserUpdatePassword } from 'src/app/models/iUserUpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private userService: UserService) { }

  updateProfileService(formData: FormData,id: string): Observable<IUserUpdate> {
    return this.userService.updateProfile(formData,id);
  }

  updatePasswordService(id: string, formData: FormData) {
    const user: IUserUpdatePassword = {
      id: id,
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
    };
    return this.userService.updatePassword(user);
  }

}
