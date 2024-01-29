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

  user = {
    name: "Camila Soares",
    locale: "Brasil",
    profileImg: "assets/imgs/img_profile_orange_portfolio.png",
  };
  
  constructor(private viewProjectMobileService: ViewProjectMobileService) {}
  ngOnInit(): void {
    const currentProject = this.viewProjectMobileService.currentProject;
    if (currentProject) {
      this.project = currentProject.data;
    }
    this.viewProjectMobileService.clearProjectInfo();
  }
}
