import { Component, Input, OnInit } from "@angular/core";
import { IProject, ProjecEventEnum } from "src/app/models/iProject";
import { ModalActionService } from "../modal-action/services/modal-action.service";
import { DeleteConfirmationService } from "../delete-confirmation/services/delete-confirmation.service";
import { ProjectService } from "src/app/appServices/project.service";

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
    private modalDeleteService: DeleteConfirmationService
  ) {}
  ngOnInit(): void {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  editItem(item: IProject) {
    this.modalActionService.dispatch({
      type: ProjecEventEnum.ADD_PROJECT,
      data: item,
    });
    this.modalActionService.openDialog("Editar Projeto");
  }

  deleteProject(id: number) {
    this.modalDeleteService.openDialog();
    this.modalDeleteService.confirm().subscribe((confirm) => {
      if (confirm) {
        console.log("deleta");
      } else {
        console.log("não deleta");
      }
    });
  }
}
