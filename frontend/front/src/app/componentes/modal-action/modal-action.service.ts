import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalActionComponent } from './modal-action.component';

@Injectable({
  providedIn: 'root'
})

export class ModalActionService {
  constructor(private dialog: MatDialog) {}

  openDialog(name: string) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      position: { top: '9.25rem'},
      data: {name:name}
    });
  }
}
