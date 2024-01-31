import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  user: any;

  constructor(private matIconRegistry: MatIconRegistry, private  domSanitizer: DomSanitizer, private router: Router){
    this.matIconRegistry.addSvgIcon(
      "Logo Orange Juice",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logos/logoOrange.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logos/circle.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Icon Notification",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logos/iconNotification.svg")
    );
    this.user = JSON.parse(sessionStorage.getItem("userInfo") || "");
    this.user.iconUrl = this.user.iconUrl ? this.user.iconUrl : "assets/imgs/img_profile_orange_portfolio.png";
  }

  signOut(){
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("authToken");
    // redirecionar
  }
}
