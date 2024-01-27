import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectInfoComponent } from '../view-project-info.component';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectInfoService {

  constructor(private dialog: MatDialog) { }

  openDialog(data: string) {
    const isMobile = window.innerWidth <= 992;
    const width = isMobile ? "22.5rem" : "65.125rem";
    const height = isMobile ? "43.625rem" : "61.30094rem";
    const position = isMobile ? { top: "9.25rem" } : { top: "8.38rem", bottom: "15rem" };
  
    const dialogRef = this.dialog.open(ViewProjectInfoComponent, {
      data: { data: data },
      position: position,
      width: width,
      height: height,
    });
  }
}
