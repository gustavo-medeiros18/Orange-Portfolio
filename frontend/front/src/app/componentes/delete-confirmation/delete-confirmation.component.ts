import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationService } from './services/delete-confirmation.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  constructor(private deleteConfirmationService: DeleteConfirmationService
    ,private dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}


    onConfirm() {
      this.deleteConfirmationService.confirmModal(true);
      this.dialogRef.close(true);
    }

    onCancel() {
      this.deleteConfirmationService.confirmModal(false);
      this.dialogRef.close(true);
    }
}
