import { Component, Input } from "@angular/core";
import { IProject } from "src/app/models/iProject";
import { ModalActionService } from "../modal-action/services/modal-action.service";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent {
  @Input() projects: IProject[] = [];
  @Input() userName: string = "";
  @Input() userImg: string = "";

  constructor(private modalActionService: ModalActionService) {}

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }
}
