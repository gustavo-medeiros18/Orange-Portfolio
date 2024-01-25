import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalActionComponent } from './modal-action.component';

@Injectable({
  providedIn: 'root'
})

export class ModalActionService {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      width: '16.6rem',
      height: '50.1rem',
      position: { top: '9.25rem', bottom: '1.63rem' },
    });
  }
}
