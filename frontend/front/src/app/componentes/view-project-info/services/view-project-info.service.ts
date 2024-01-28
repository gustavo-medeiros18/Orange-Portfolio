import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectInfoComponent } from '../view-project-info.component';
import { IProject } from 'src/app/models/iProject';
import { IModal } from '../../models/iModal';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectInfoService {

  constructor(private dialog: MatDialog) { }

  openDialog(user: IModal, project: IProject) {
    const dialogRef = this.dialog.open(ViewProjectInfoComponent, {
      data: {user, project},  
      width: "100rem",
      height: "50rem",
      position: { 
        top: "8.37rem",
        bottom: "1.7rem" 
      },
    });
  }
}
