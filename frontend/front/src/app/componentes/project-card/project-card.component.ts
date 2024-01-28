import { Component, Input, OnInit } from "@angular/core";
import { IProject, ProjecEventEnum } from "src/app/models/iProject";
import { ModalActionService } from "../modal-action/services/modal-action.service";
import { DeleteConfirmationService } from "../delete-confirmation/services/delete-confirmation.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { ProjectCardService } from "./services/project-card.service";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit {
  @Input() projects: IProject[] = [];
  @Input() userName: string = "";
  @Input() userImg: string = "";

  constructor(
    private modalActionService: ModalActionService,
    private modalDeleteService: DeleteConfirmationService,
    private projectActionService: ProjectActionService,
    private projectCardService: ProjectCardService
  ) {}
  ngOnInit(): void {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  editItem(item: IProject) {
    const action: string = "Editar Projeto";
    this.modalActionService.dispatch({
      type: ProjecEventEnum.ADD_PROJECT,
      data: item,
    });
    this.modalActionService.openDialog(action);
  }

  deleteProject(id: number) {
    const action: string = "deletar";
    this.modalDeleteService.openDialog();
    this.modalDeleteService.getConfirmation().subscribe((confirm) => {
      if (confirm) {
        this.projectCardService.deleteProjectCard(id).subscribe({
          next: () => {
            this.projectActionService.openDialog(action, "success");
          },
          error: () => {
            this.projectActionService.openDialog(action, "error");
          },
        })
      }
    });
  }
}
