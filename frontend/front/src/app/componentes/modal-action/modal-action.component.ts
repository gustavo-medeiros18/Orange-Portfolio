import { Component, Inject, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModal } from "./models/imodal";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent {
  form!: FormGroup;

  hasError: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public modal: IModal, private modalService: ModalActionService, private alertService: ProjectActionService) {}

  updateProject() {
    if(this.form.invalid) {
      this.hasError = "Preencha todos os campos";
    }

    const result = this.modalService.pathProjectModal(this.form.value);

    if(!result) {
      this.alertService.openDialog("editar", "error")
      return;
    }

    this.alertService.openDialog("editar", "error");
  }
}
