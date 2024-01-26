import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalActionComponent } from "../modal-action.component";
import { IProject } from "src/app/models/iProject";
import { ProjectService } from "src/app/appServices/project.service";
import { Observable, Observer, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalActionService {
  constructor(private dialog: MatDialog, private projectService: ProjectService) {}

  openDialog(name: string) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      position: { top: "9.25rem" },
      data: { name: name },
    });
  }

  pathProjectModal(params: IProject): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.projectService.patchProject(params).subscribe({
        next: (value) => {
          resolve(true);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
}
