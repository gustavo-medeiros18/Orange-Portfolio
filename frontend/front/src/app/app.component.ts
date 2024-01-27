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

  project: IProject;
  user: IModal;

  constructor(
    private projectActionService: ProjectActionService,
    private deleteConfirmationService: DeleteConfirmationService,
    private viewProjectInfoService: ViewProjectInfoService
  ) {
    this.project = {
      title: "Projeto Aleatório",
      tags: ["Tag1", "Tag2", "Tag3"],
      link: "https://exemplo.com",
      description: "Este é um projeto aleatório com informações fictícias",
      releaseDate: "2024-01-27",
      id: 1,
    };
    this.user = {
      name: "Username",
      lastName: "Da silva",
      email: "123@gmail.com",

    }
  }

  openDialog(action: string, result: string) {
    this.projectActionService.openDialog(action, result);
  }

  openDialogDelete() {
    this.deleteConfirmationService.openDialog();
  }

  openDialogViewProject(user: IModal, project: IProject) {
    this.viewProjectInfoService.openDialog(user,project);
  }
}
