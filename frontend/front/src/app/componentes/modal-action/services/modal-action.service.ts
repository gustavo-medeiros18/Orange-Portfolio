import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalActionComponent } from "../modal-action.component";
import { IProject, IProjectEvent, ProjecEventEnum } from "src/app/models/iProject";
import { ProjectService } from "src/app/appServices/project.service";
import { Observable, Observer, Subject, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalActionService {

  private emmitter: Subject<IProjectEvent<ProjecEventEnum, any>> = new Subject();
  public onComponentEvent = this.emmitter.asObservable();

  constructor(private dialog: MatDialog, private projectService: ProjectService) {}

  openDialog(name: string) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      position: { top: "9.25rem" },
      data: { name: name },
    });
  }

  public dispatch (action: IProjectEvent<ProjecEventEnum, any>){
    this.emmitter.next({...action});
  }

  openEditDialog(name: string, params: IProject) {
    this.dialog.open(ModalActionComponent, {
      position: { top: "9.25rem" },
      data: {
        title: params.title,
        name: name,
        tags: params.tags,
        link: params.link,
        description: params.description,
        img: params.img,
        id: params.id,
      },
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
