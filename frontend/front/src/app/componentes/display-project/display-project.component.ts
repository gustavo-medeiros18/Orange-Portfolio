import { Component, Input } from "@angular/core";
import { IProject } from "src/app/models/iProject";
import { DeleteConfirmationService } from "../delete-confirmation/services/delete-confirmation.service";
import { ModalActionService } from "../modal-action/services/modal-action.service";

@Component({
  selector: "app-display-project",
  templateUrl: "./display-project.component.html",
  styleUrls: ["./display-project.component.scss"],
})
export class DisplayProjectComponent {
  @Input() projects: IProject[] = [];
  @Input() userImg: string = "";

  constructor() {}
}
