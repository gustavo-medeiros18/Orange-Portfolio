import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ViewProjectInfoComponent } from "../view-project-info.component";
import { IProject } from "src/app/models/iProject";

@Injectable({
  providedIn: "root",
})
export class ViewProjectInfoService {
  constructor(private dialog: MatDialog) {}

  openDialog(project: IProject) {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      this.dialog.open(ViewProjectInfoComponent, {
        data: {project, isMobile },
        maxWidth: "100vw",
        maxHeight: "100vh",
        width: "100%",
        height: "50rem",
        position: {
          top: "5.5rem",
          bottom: "1.7rem",
        },
        panelClass: "full-screen-modal",
      });
    } else {
      this.dialog.open(ViewProjectInfoComponent, {
        data: { project, isMobile },
        width: "100%",
        height: "50rem",
        position: {
          top: "8.37rem",
          bottom: "1.7rem",
        },
      });
    }
  }

}
