import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationService {

  private confirmSubject!: Subject<boolean>;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.confirmSubject = new Subject<boolean>();
    const isMobile = window.innerWidth <= 992;
    const width = isMobile ? "19.5rem" : "26.312rem";
    const height = isMobile? "12.125rem" : "15.125rem";
    this.dialog.open(DeleteConfirmationComponent, {
      width,
      height
    });
  }

  confirm(confirm: boolean) {
    this.confirmSubject.next(confirm);
    this.confirmSubject.complete();
  }

  getConfirmation(): Observable<boolean> {
    return this.confirmSubject.asObservable();
  }
}
