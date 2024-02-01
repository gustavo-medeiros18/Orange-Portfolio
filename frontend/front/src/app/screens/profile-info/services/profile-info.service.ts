import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/appServices/user.service';
import { IUserLogin } from 'src/app/models/iUserLogin';
import { IUserUpdate } from 'src/app/models/iUserUpdate';
import { IUserUpdatePassword } from 'src/app/models/iUserUpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(private userService: UserService) { }

  updateProfileService(id: string, formData: FormData): Observable<IUserUpdate> {
    const user: IUserUpdate = {
      id: id,
      name: formData.get("name") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
    };
    return this.userService.updateProfile(user);
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
