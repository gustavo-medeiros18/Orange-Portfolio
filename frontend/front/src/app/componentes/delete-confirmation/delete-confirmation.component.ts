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
      this.deleteConfirmationService.confirm(true);
    }

    onCancel() {
      this.deleteConfirmationService.confirm(false);
    }
}
