import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { NavBarService } from "./services/nav-bar.service";
import { IUser } from "src/app/models/iUser";
import { Observable } from "rxjs";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {

  isMobile!: boolean;
  user$!: Observable<IUser>;
  defaultIcon: string = "assets/imgs/img_profile_orange_portfolio.png";

  ngOnInit(): void {
    const userId = JSON.parse(sessionStorage.getItem("id") ?? "");
    this.user$  = this.navBarService.getUserInfo(userId);
  }

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private navBarService: NavBarService
  ) {
    this.isMobile = window.innerWidth < 600;
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
  }

  signOut() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
    location.reload();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 600;
    // redirecionar
  }
}
