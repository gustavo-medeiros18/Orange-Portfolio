import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModal } from "./models/imodal";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { Subscription, filter, tap } from "rxjs";
import { IProject, IProjectEvent, ProjecEventEnum } from "src/app/models/iProject";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  hasError: string = "";

  project!: IProject;

  private subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private alertService: ProjectActionService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.listenerModalEvent();
    this.form = this.formBuilder.group({
      title: [this.project ? this.project.title : "", [Validators.required]],
      tags: [this.project ? this.project.tags : "", [Validators.required]],
      link: [this.project ? this.project.link : "", [Validators.required]],
      description: [this.project ? this.project.description : "", [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private listenerModalEvent(): void {
    this.subscription.add(
      this.modalService.onComponentEvent
        .pipe(
          filter(
            (event): event is IProjectEvent<ProjecEventEnum, IProject> =>
              event !== null && event.type === ProjecEventEnum.ADD_PROJECT
          ),
          tap((event) => {
            this.project = event.data;
          })
        )
        .subscribe()
    );
  }

  // updateProject() {
  //   if (this.form.invalid) {
  //     this.hasError = "Preencha todos os campos";
  //   }

  //   const result = this.modalService.pathProjectModal(this.form.value);

  //   if (!result) {
  //     this.alertService.openDialog("editar", "error");
  //     return;
  //   }

  //   this.alertService.openDialog("editar", "success");
  // }
}
