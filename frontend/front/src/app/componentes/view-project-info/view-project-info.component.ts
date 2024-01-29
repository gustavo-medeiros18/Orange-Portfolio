import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IProject } from "src/app/models/iProject";
import { IModal } from "../models/iModal";

@Component({
  selector: "app-view-project-info",
  templateUrl: "./view-project-info.component.html",
  styleUrls: ["./view-project-info.component.scss"],
})
export class ViewProjectInfoComponent {
  user = {
    name: "Camila Soares",
    locale: "Brasil",
    profileImg: "assets/imgs/img_profile_orange_portfolio.png",
  };

  isMobile: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: { user: IModal; project: IProject; isMobile: boolean }
  ) {}

  goTo(link: string) {
    window.open(link, "_blank");
  }
}
