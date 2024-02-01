import { Component } from '@angular/core';
import { ProfileInfoService } from './services/profile-info.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {

  constructor(private profileInfoService: ProfileInfoService){}

  updatePassword(currentPassword: string, newPassword: string){
    
    //this.profileInfoService(currentPassword, newPassword);
  }

}
