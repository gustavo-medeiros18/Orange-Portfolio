import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectActionService } from './componentes/project-action/services/project-action.service';
import { DeleteConfirmationService } from './componentes/delete-confirmation/services/delete-confirmation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(private projectActionService: ProjectActionService, private deleteConfirmationService: DeleteConfirmationService) {}

  openDialog(action: string,result: string) {
    this.projectActionService.openDialog(action,result);
  }

  openDialogDelete() {
    this.deleteConfirmationService.openDialog();
  }
}
