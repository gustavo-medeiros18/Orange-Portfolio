import { IProject } from "./../../models/iProject";
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalActionService } from "./services/modal-action.service";
import { ProjectActionService } from "../project-action/services/project-action.service";
import { IModal } from "../models/iModal";
import { ViewProjectInfoService } from "../view-project-info/services/view-project-info.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatChipInputEvent } from "@angular/material/chips";
import { isLink, noWhitespaceValidator } from "../../Validators/validators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { preSelectedTags } from "./helper";
import { Observable, map, startWith } from "rxjs";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent implements OnInit {
  //tag system
  tags: string[] = [];
  formControl = new FormControl("", [Validators.required]);
  announcer = inject(LiveAnnouncer);
  isFieldClicked: boolean = false;

  form!: FormGroup;

  // projeto que esta sendo editado
  project!: IProject | null;
  selectedImage: string | undefined;
  formData = new FormData();
  hasErrorImg: string = "";

  user: any;

  tagsCtrl = new FormControl();

  //filteredTags: string[] = preSelectedTags;

  filteredTags!: Observable<string[]>;

  @ViewChild("tagsInput") tagsInput!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modal: IModal,
    private modalService: ModalActionService,
    private projectActionService: ProjectActionService,
    private viewProjectInfoService: ViewProjectInfoService,
    private formBuilder: NonNullableFormBuilder
  ) {
    const userId = JSON.parse(sessionStorage.getItem("id") || "");
    this.modalService.getUserInfo(userId).subscribe((user) => (this.user = user));
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : preSelectedTags.slice()))
    );
  }

  ngOnInit(): void {
    // Logica para preencher informaçoes do projeto ao editá-lo
    const currentProject = this.modalService.currentProject;
    if (currentProject) {
      this.project = currentProject.data;
    }
    this.selectedImage = this.project?.imgUrl as string;
    this.project?.tags.forEach((tag) => this.tags.push(tag));
    this.form = this.formBuilder.group({
      title: [
        this.project ? this.project.title : "",
        [Validators.required, noWhitespaceValidator(), Validators.minLength(5)],
      ],
      tags: "",
      link: [this.project ? this.project.link : "", [isLink(), Validators.required]],
      description: [this.project ? this.project.description : "", [Validators.required]],
    });
    this.modalService.clearProjectInfo(); // retorna ao estado inicial (inputs vazios)
  }

  formErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("whitespace")) {
      return "Este campo não pode conter apenas espaços em branco";
    }
    if (field?.hasError("minlength")) {
      return "Este campo está muito curto";
    }
    if (field?.hasError("link")) {
      return "Link inválido";
    }

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

      this.formData.append("imgUrl", selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  addProject() {
    const idUser = this.user.id;
    const action: string = "adicionar";
    this.formData.append("title", this.form.value.title);
    this.appendTags(this.tags);
    this.formData.append("link", this.form.value.link);
    this.formData.append("description", this.form.value.description);
    this.formData.append("idUser", idUser);
    this.modalService.createProjectModal(this.formData).subscribe({
      next: () => {
        this.projectActionService.openDialog(action, "success");
        this.modalService.emit();
      },
      error: (error) => {
        this.projectActionService.openDialog(action, "error");
      },
    });
  }

  editProject() {
    const idUser = this.user.id;
    const action: string = "editar";
    this.formData.append("title", this.form.value.title);
    this.appendTags(this.tags);
    this.formData.append("link", this.form.value.link);
    this.formData.append("description", this.form.value.description);
    this.formData.append("idUser", idUser);
    this.modalService.putProjectModal(this.formData, this.project?.id!).subscribe({
      next: () => {
        this.projectActionService.openDialog(action, "success");
        this.modalService.emit();
      },
      error: (error) => {
        this.projectActionService.openDialog(action, "error");
      },
    });
  }

  viewProject() {
    const projectForm = this.form.value;
    const project: IProject = {
      userName: this.user.name,
      lastName: this.user.lastName,
      iconUrl: this.user.iconUrl,
      title: projectForm.title,
      tags: this.tags,
      link: projectForm.link,
      description: projectForm.description,
      createdAt: projectForm.createdAt,
      imgUrl: this.selectedImage,
    };
    this.viewProjectInfoService.openDialog(project);
  }

  isButtonDisabled(): boolean {
    return this.form.invalid || this.tags.length === 0;
  }

  //tag system

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
    if (this.tags.length === 0) this.emptyFormTags();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = "";
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return preSelectedTags.filter((tags) => tags.toLowerCase().includes(filterValue));
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`removed ${tag}`);
    }
    if (this.tags.length === 0) this.emptyFormTags();
  }

  emptyFormTags() {
    this.formControl.setErrors({ required: true });
    this.formControl.markAsTouched();
  }

  appendTags(tags: string[]) {
    if (tags.length > 1) {
      this.formData.append("tags", tags.join(", "));
    } else if (tags.length === 1) {
      this.formData.append("tags", tags.toString());
    }
  }
}
