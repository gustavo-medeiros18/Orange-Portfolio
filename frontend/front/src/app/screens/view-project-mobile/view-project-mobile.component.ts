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
    window.scroll({ top: 0 });
    const currentProject = this.viewProjectMobileService.currentProject;
    if (currentProject) {
      this.project = currentProject.data;
    }
    this.viewProjectMobileService.clearProjectInfo();
  }
}
