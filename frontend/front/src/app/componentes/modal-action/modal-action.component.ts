import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { IProject } from "src/app/models/iProject";
import { IModal } from "../models/iModal";
import { ViewProjectInfoService } from "../view-project-info/services/view-project-info.service";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit {
  form!: FormGroup;

  hasError: string = "";

  // projeto que esta sendo editado
  project!: IProject | null;

  selectedImage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private viewProjectInfoService: ViewProjectInfoService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    const currentProject = this.modalService.currentProject;
    if (currentProject) {
      this.project = currentProject.data;
    }
    this.selectedImage = this.project?.img;
    this.form = this.formBuilder.group({
      title: [this.project ? this.project.title : "", [Validators.required]],
      tags: [this.project ? this.project.tags : "", [Validators.required]],
      link: [this.project ? this.project.link : "", [Validators.required]],
      description: [this.project ? this.project.description : "", [Validators.required]],
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

  addProject(form: FormGroup){
    const user: IModal = {
      name: "Camila",
      lastName: "Soares",
      email: "camilasoares123@gmail.com",
      profileImg: "assets/imgs/img_profile_orange_portfolio.png",
    };
    const projectForm = this.form.value;
    const project: IProject = {
      title: projectForm.title,
      tags: projectForm.tags.split(","),
      link: projectForm.link,
      description: projectForm.description,
      releaseDate: "2024-01-27",
      id: 1,
      img: this.selectedImage
    };
    this.viewProjectInfoService.openDialog(user,project);
    //call to API
    // call project-action
  }

  editProject(form: FormGroup){
    const user: IModal = {
      name: "Camila",
      lastName: "Soares",
      email: "camilasoares123@gmail.com",
      profileImg: "assets/imgs/img_profile_orange_portfolio.png",
    };
    const projectForm = this.form.value;
    const project: IProject = {
      title: projectForm.title,
      tags: projectForm.tags.split(","),
      link: projectForm.link,
      description: projectForm.description,
      releaseDate: "2024-01-27",
      id: 1,
      img: this.selectedImage
    };
    this.viewProjectInfoService.openDialog(user,project);
    // call to API
    // call project-action
  }

  /*updateProject() {
    if (this.form.invalid) {
      this.hasError = "Preencha todos os campos";
    }

    const result = this.modalService.pathProjectModal(this.form.value);

    if (!result) {
      this.alertService.openDialog("editar", "error");
      return;
    }

    this.alertService.openDialog("editar", "success");
  }*/
}
