import { Component, Input, OnInit } from "@angular/core";
import { IProject, ProjecEventEnum } from "src/app/models/iProject";
import { ModalActionService } from "../modal-action/services/modal-action.service";
import { DeleteConfirmationService } from "../delete-confirmation/services/delete-confirmation.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { ProjectCardService } from "./services/project-card.service";
import { ViewProjectMobileService } from "src/app/screens/view-project-mobile/services/view-project-mobile.service";
import { ViewProjectInfoService } from "../view-project-info/services/view-project-info.service";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit {
  @Input() projects: IProject[] = [];
  @Input() edit: boolean = false;
  @Input() tags: boolean = true;
  @Input() cover: boolean = true;
  user: any;

  constructor(
    private modalActionService: ModalActionService,
    private modalDeleteService: DeleteConfirmationService,
    private projectActionService: ProjectActionService,
    private projectCardService: ProjectCardService,
    private viewProjectMobileService: ViewProjectMobileService,
    private viewProjectInfoService: ViewProjectInfoService
  ) {}
  ngOnInit(): void {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  selectProject(project: IProject) {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      this.viewProjectMobileService.dispatch({
        type: ProjecEventEnum.ADD_PROJECT,
        data: project,
      });
      this.viewProjectMobileService.openPage();
    } else {
      this.viewProjectInfoService.openDialog(project);
    }
  }

  editProject(item: IProject) {
    const action: string = "Editar Projeto";
    this.modalActionService.dispatch({
      type: ProjecEventEnum.ADD_PROJECT,
      data: item,
    });
    this.modalActionService.openDialog(action);
  }

  deleteProject(id: string) {
    const action: string = "deletar";
    this.modalDeleteService.openDialog();
    this.modalDeleteService.getConfirmation().subscribe((confirm) => {
      if (confirm) {
        this.projectCardService.deleteProjectCard(id).subscribe({
          next: () => {
            this.projectActionService.openDialog(action, "success");
            this.modalActionService.emit();
          },
          error: () => {
            this.projectActionService.openDialog(action, "error");
          },
        })
      }
    });
  }


  formatData(createdAt: string){
    const data = new Date(createdAt);
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }

  // caso o usuário não tenha ícone, mostra o ícone padrão
  getBackgroundStyle(project: IProject): { [key: string]: string } {
    const backgroundImage = project.iconUrl
      ? `url(${project.iconUrl})`
      : "url(assets/imgs/img_profile_orange_portfolio.png)";
    return { 'background-image': backgroundImage };
  }
  
}
