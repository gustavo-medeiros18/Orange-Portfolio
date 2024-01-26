import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectActionService } from './componentes/project-action/services/project-action.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(private projectActionService: ProjectActionService) {}

  openDialog(action: string,result: string) {
    this.projectActionService.openDialog(action,result);
  }
}
