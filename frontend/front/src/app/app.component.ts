import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalActionService } from './componentes/modal-action/modal-action.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(private dialog: MatDialog,private modalActionService: ModalActionService) {}

  openDialog() {
    this.modalActionService.openDialog();
  }
}