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
  user: any;

  isMobile: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: {project: IProject; isMobile: boolean }
  ) {
    modal.project.createdAt = new Date().toString();
  }

  currentDate(){
      const data = new Date();
      const month = (data.getMonth() + 1).toString().padStart(2, '0');
      const year = data.getFullYear().toString().slice(-2);
      return `${month}/${year}`;
  }

  goTo(link: string) {
    window.open(link, "_blank");
  }
}
