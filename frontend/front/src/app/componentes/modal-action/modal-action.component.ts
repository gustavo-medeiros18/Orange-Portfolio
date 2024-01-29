import { Component, Inject, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { IProject } from "src/app/models/iProject";
import { IModal } from "../models/iModal";
import { ViewProjectInfoService } from "../view-project-info/services/view-project-info.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit {
  //tag system
  tags: string[] = [];
  formControl = new FormControl(['angular']);
  announcer = inject(LiveAnnouncer);


  form!: FormGroup;

  // projeto que esta sendo editado
  project!: IProject | null;
  selectedImage: string | undefined;
  formData = new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private projectActionService: ProjectActionService,
    private viewProjectInfoService: ViewProjectInfoService,
    private formBuilder: NonNullableFormBuilder,
  ) {}

  ngOnInit(): void {
    const currentProject = this.modalService.currentProject;
    if (currentProject) {
      this.project = currentProject.data;
    }
    this.selectedImage = this.project?.imgUrl as string;
    this.project?.tags.forEach((tag) => this.tags.push(tag));
    this.form = this.formBuilder.group({
      title: [this.project ? this.project.title : "", [Validators.required]],
      tags: "",
      link: [this.project ? this.project.link : "", [Validators.required]],
      description: [this.project ? this.project.description : "", [Validators.required]],
    });
    this.modalService.clearProjectInfo(); // retorna ao estado inicial (inputs vazios)
  }

  formErrorMessage() {
    return "Este campo é necessário";
  }

  triggerFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      if (this.formData.has("imgUrl")) {
        this.formData.delete("imgUrl");
      }

      this.formData.append("imgUrl",selectedFile);
      const reader = new FileReader();
      reader.onload = () => { 
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  addProject() {
    const action: string = "adicionar";
    this.formData.append("title", this.form.value.title);
    this.formData.append("tags",JSON.stringify(this.tags));
    this.formData.append("link", this.form.value.link);
    this.formData.append("description", this.form.value.description);
    // adicionar id do usuario após autenticação
    this.formData.append("idUser","10");
    this.modalService.createProjectModal(this.formData).subscribe({
      next: () => {
        this.projectActionService.openDialog(action, "success");
      },
      error: (error) => {
        this.projectActionService.openDialog(action, "error");
      },
    });
  }

  editProject() {
    const action: string = "editar";
    this.formData.append("title", this.form.value.title);
    this.formData.append("tags",JSON.stringify(this.tags));
    this.formData.append("link", this.form.value.link);
    this.formData.append("description", this.form.value.description);
    this.modalService.pathProjectModal(this.formData, this.project?.id!).subscribe({
      next: () => {
        this.projectActionService.openDialog(action, "success");
      },
      error: (error) => {
        this.projectActionService.openDialog(action, "error");
      },
    });
  }

  viewProject() {
    const user: IModal = {
      name: "Camila",
      lastName: "Soares",
      email: "camilasoares123@gmail.com",
      profileImg: "assets/imgs/img_profile_orange_portfolio.png",
    };
    const projectForm = this.form.value;
    const project = {
      title: projectForm.title,
      tags: this.tags,
      link: projectForm.link,
      description: projectForm.description,
      releaseDate: "2024-01-27",
      id: 1,
      img: this.selectedImage,
    };
    this.viewProjectInfoService.openDialog(user, project);
  }

  isButtonDisabled(): boolean {
    //console.log(this.form.value);
    return this.form.invalid;
  }

  //tag system

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }


  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`removed ${tag}`);
    }
  }
}
