import { Component, HostListener, ViewChild } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginAppService } from "src/app/appServices/login-app.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent {
  isMobile: boolean;

  constructor(private matIconRegistry: MatIconRegistry, private  domSanitizer: DomSanitizer,
    private loginAppService: LoginAppService){
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

  signOut() {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("authToken");
    location.reload();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 600;
    // redirecionar
  }
}
