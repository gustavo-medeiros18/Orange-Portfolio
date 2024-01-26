import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModal } from "./models/imodal";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { Subscription, filter, tap } from "rxjs";
import { IProject, ProjecEventEnum } from "src/app/models/iProject";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit {
  form!: FormGroup;

  hasError: string = "";

  project!: IProject;
  private subscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private alertService: ProjectActionService
  ) {}
  ngOnInit(): void {
    this.subscription = new Subscription();
    this.listenerModalEvent();
  }

  private listenerModalEvent(): void {
    this.subscription.add(
      this.modalService.onComponentEvent
        .pipe(
          filter((event) => event.type === ProjecEventEnum.ADD_PROJECT),
          tap(({ data }) => {this.project = data;})
        )
        .subscribe()
    );
  }

  updateProject() {
    if (this.form.invalid) {
      this.hasError = "Preencha todos os campos";
    }

    const result = this.modalService.pathProjectModal(this.form.value);

    if (!result) {
      this.alertService.openDialog("editar", "error");
      return;
    }

    this.alertService.openDialog("editar", "success");
  }
}
