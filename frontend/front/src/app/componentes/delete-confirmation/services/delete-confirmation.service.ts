import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationService {

  private confirmSubject = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}


  confirm(): Observable<boolean> {
    return this.confirmSubject.asObservable();
  }

  confirmModal(confirm: boolean) {
    this.confirmSubject.next(confirm);
  }

  openDialog() {
    const isMobile = window.innerWidth <= 992;
    const width = isMobile ? "19.5rem" : "26.312rem";
    const height = isMobile? "12.125rem" : "15.125rem";
    this.dialog.open(DeleteConfirmationComponent, {
      width,
      height
    });
  }
}
