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
  constructor(private modalActionService: ModalActionService) {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }
}
