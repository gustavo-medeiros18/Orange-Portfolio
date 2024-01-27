import { Component,Inject, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { IProject} from "src/app/models/iProject";
import { IModal } from "../models/imodal";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit{
  form!: FormGroup;

  hasError: string = "";

  project!: IProject | null;

  selectedImage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private alertService: ProjectActionService,
    private formBuilder: NonNullableFormBuilder,
  ) {}

  ngOnInit(): void {
    const currentProject = this.modalService.currentProject;
    if (currentProject){
      this.project = currentProject.data;
    }
    this.selectedImage = this.project?.img;
    this.form = this.formBuilder.group({
      title: [this.project? this.project.title : "", [Validators.required]],
      tags: [this.project? this.project.tags: "", [Validators.required]],
      link: [this.project? this.project.link: "", [Validators.required]],
      description: [this.project? this.project.description: "", [Validators.required]],
    });
    this.modalService.clearProjectInfo(); // retorna ao estado inicial (inputs vazios)
  }


  formErrorMessage() {
    return "Este campos é necessário";
  }

  triggerFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  handleOnConfirm() {
    //this.project?.id ? this.updateProject() : this.createProject();
    this.alertService.openDialog("editar", "success");

  }
  createProject() {
    if (this.form.invalid) {
      this.hasError = "Preencha todos os campos";
      return;
    }

    if(!this.selectedImage) {
      this.hasError = "Adicione uma imagem de capa ao seu projeto";
      return;
    }

    const result = this.modalService.createProject(this.form.value);

    if (!result) {
      this.alertService.openDialog("editar", "error");
      return;
    }

    this.alertService.openDialog("editar", "success");
  }

  updateProject() {
    if (this.form.invalid) {
      this.hasError = "Preencha todos os campos";
      return;
    }

    if(!this.selectedImage) {
      this.hasError = "Adicione uma imagem de capa ao seu projeto";
      return;
    }

    const result = this.modalService.pathProjectModal(this.form.value);

    if (!result) {
      this.alertService.openDialog("editar", "error");
      return;
    }

    this.alertService.openDialog("editar", "success");
  }
}
