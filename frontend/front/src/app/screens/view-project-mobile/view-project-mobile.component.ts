import { Component, OnInit } from "@angular/core";
import { ViewProjectMobileService } from "./services/view-project-mobile.service";
import { IProject } from "src/app/models/iProject";

@Component({
  selector: "app-view-project-mobile",
  templateUrl: "./view-project-mobile.component.html",
  styleUrls: ["./view-project-mobile.component.scss"],
})
export class ViewProjectMobileComponent implements OnInit {
  project!: IProject | null;

  user: any;

  constructor(private viewProjectMobileService: ViewProjectMobileService) {}
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("userInfo") || "");
    this.user.iconUrl = this.user.iconUrl ? this.user.iconUrl : "assets/imgs/img_profile_orange_portfolio.png";
    const currentProject = this.viewProjectMobileService.currentProject;
    if (currentProject) {
      console.log(currentProject);
      this.project = currentProject.data;
    }
    this.viewProjectMobileService.clearProjectInfo();
  }
}
