import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectActionComponent } from '../project-action.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectActionService {

  constructor(private dialog: MatDialog) {}

  openDialog(action: string, result: string) {
    this.dialog.open(ProjectActionComponent, {
      width: "21.9375rem",
      height: "15.125rem",
      data: {action:action, result:result}
    });
  }
}
