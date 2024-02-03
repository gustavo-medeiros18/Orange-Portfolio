import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/appServices/user.service';
import { IUser } from 'src/app/models/iUser';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private userService: UserService) { }


  getUserInfo(id: string): Observable<IUser> {
    return this.userService.getUserById(id);
  }
  
}
