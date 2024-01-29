import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ViewProjectInfoComponent } from "../view-project-info.component";
import { IProject } from "src/app/models/iProject";
import { IModal } from "../../models/iModal";

@Injectable({
  providedIn: "root",
})
export class ViewProjectInfoService {
  constructor(private dialog: MatDialog) {}

  openDialog(user: IModal, project: IProject) {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      this.dialog.open(ViewProjectInfoComponent, {
        data: { user, project, isMobile },
        maxWidth: "100vw",
        maxHeight: "100vh",
        width: "100%",
        height: "50rem",
        position: {
          top: "8.37rem",
          bottom: "1.7rem",
        },
        panelClass: "full-screen-modal",
      });
    } else {
      this.dialog.open(ViewProjectInfoComponent, {
        data: { user, project, isMobile },
        width: "100%",
        height: "50rem",
        position: {
          top: "8.37rem",
          bottom: "1.7rem",
        },
      });
    }
  }


  openDialogDiscover(user: IModal, project: IProject) {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      this.dialog.open(ViewProjectInfoComponent, {
        data: { user, project, isMobile },
        maxWidth: "100vw",
        maxHeight: "100vh",
        width: "100%",
        height: "100%",
        panelClass: "full-screen-modal",
      });
    } else {
      this.dialog.open(ViewProjectInfoComponent, {
        data: { user, project, isMobile },
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
