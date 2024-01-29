import { Component, Input, OnInit } from "@angular/core";
import { IProject, ProjecEventEnum } from "src/app/models/iProject";
import { ModalActionService } from "../modal-action/services/modal-action.service";
import { DeleteConfirmationService } from "../delete-confirmation/services/delete-confirmation.service";
import { ProjectService } from "src/app/appServices/project.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { ViewProjectMobileService } from "src/app/screens/view-project-mobile/services/view-project-mobile.service";
import { ViewProjectInfoService } from "../view-project-info/services/view-project-info.service";
import { IModal } from "../models/iModal";

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
    private alertService: ProjectActionService,
    private viewProjectMobileService: ViewProjectMobileService,
    private viewProjectInfoService: ViewProjectInfoService
  ) {}
  ngOnInit(): void {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  selectProject(item: IProject) {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      this.viewProjectMobileService.dispatch({
        type: ProjecEventEnum.ADD_PROJECT,
        data: item,
      });
      this.viewProjectMobileService.openPage();
    } else {
      const user: IModal = {
        name: item.firstName!,
        lastName: item.lastName!,
        email: "camilasoares123@gmail.com",
        profileImg: "assets/imgs/img_profile_orange_portfolio.png",
      };
      this.viewProjectInfoService.openDialog(user, item);
    }
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
        this.alertService.openDialog("deletar", "success");
      }
    });
  }
}
