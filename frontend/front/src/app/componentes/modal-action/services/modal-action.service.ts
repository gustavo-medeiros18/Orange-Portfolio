import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalActionComponent } from "../modal-action.component";
import { IProject, IProjectEvent, ProjecEventEnum } from "src/app/models/iProject";
import { ProjectService } from "src/app/appServices/project.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalActionService {
  private emitter: BehaviorSubject<IProjectEvent<ProjecEventEnum, IProject> | null> =
    new BehaviorSubject<IProjectEvent<ProjecEventEnum, IProject> | null>(null);
  public onComponentEvent = this.emitter.asObservable();

  constructor(private dialog: MatDialog, private projectService: ProjectService) {}

  openDialog(name: string) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      position: { top: "9.25rem" },
      data: { name: name },
    });
  }

  public dispatch(action: IProjectEvent<ProjecEventEnum, IProject>) {
    this.emitter.next({ ...action });
    this.emitter.subscribe({
      next: (data) => console.log(data),
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
        },
      });
    });
  }
}
