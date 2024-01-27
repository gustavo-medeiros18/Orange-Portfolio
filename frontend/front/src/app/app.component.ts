import { Component } from "@angular/core";
import { ProjectActionService } from "./componentes/project-action/services/project-action.service";
import { DeleteConfirmationService } from "./componentes/delete-confirmation/services/delete-confirmation.service";
import { ViewProjectInfoService } from "./componentes/view-project-info/services/view-project-info.service";
import { IProject } from "./models/iProject";
import { IModal } from "./componentes/models/iModal";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "front";

  constructor(
    private projectActionService: ProjectActionService,
    private deleteConfirmationService: DeleteConfirmationService,
  ) {}

  openDialog(action: string, result: string) {
    this.projectActionService.openDialog(action, result);
  }

  openDialogDelete() {
    this.deleteConfirmationService.openDialog();
  }
}
