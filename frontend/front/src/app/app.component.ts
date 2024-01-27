import { Component} from '@angular/core';
import { ProjectActionService } from './componentes/project-action/services/project-action.service';
import { DeleteConfirmationService } from './componentes/delete-confirmation/services/delete-confirmation.service';
import { ViewProjectInfoService } from './componentes/view-project-info/services/view-project-info.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(private projectActionService: ProjectActionService, private deleteConfirmationService: DeleteConfirmationService,
    private viewProjectInfoService: ViewProjectInfoService) {}

  openDialog(action: string,result: string) {
    this.projectActionService.openDialog(action,result);
  }

  openDialogDelete() {
    this.deleteConfirmationService.openDialog();
  }

  openDialogViewProject(data: string){
    this.viewProjectInfoService.openDialog(data);
  }
}
