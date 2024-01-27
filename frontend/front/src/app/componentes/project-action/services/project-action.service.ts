import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectActionComponent } from '../project-action.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectActionService {

  constructor(private dialog: MatDialog) {}

  openDialog(action: string, result: string) {
  const isMobile = window.innerWidth <= 992;
  const position = (isMobile && action != "deletar") ? { top: "11.87rem" } : {};
    this.dialog.open(ProjectActionComponent, {
      width: "21.9375rem",
      height: "15.125rem",
      data: {action:action, result:result},
      position
    });
  }
}
