import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectInfoComponent } from '../view-project-info.component';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectInfoService {

  constructor(private dialog: MatDialog) { }

  openDialog(data: string) {
  
    const dialogRef = this.dialog.open(ViewProjectInfoComponent, {
      data: { data: data },
      width: "100rem",
      height: "45rem",
      position: { 
        top: "8.37rem",
        bottom: "1.7rem" 
      },
    });
  }
}
