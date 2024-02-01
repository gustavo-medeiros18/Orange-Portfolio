import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ProfileInfoService } from "./services/profile-info.service";
import { ProfileActionService } from "src/app/componentes/profile-action/services/profile-action.service";
import { createPassword, noWhitespaceValidator } from "../../Validators/validators";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  visibilityNew: boolean = false;
  visibilityCurrent: boolean = false;
  currentPassword: string = "password";
  newPassword: string = "password"

  formProfile!: FormGroup;

  formPassword!: FormGroup;

  loading: boolean = false;
  loadingPassword: boolean = false;
  hasError: string = "";

  selectedImage: string | undefined;

  formDataProfile = new FormData();
  formDataPassword = new FormData();

  user: any;

  constructor(private formBuilder: NonNullableFormBuilder, private profileInfoService: ProfileInfoService,
    private profileActionService: ProfileActionService) {
    this.user = JSON.parse(sessionStorage.getItem("userInfo") || "");
  }

  ngOnInit() {
    this.clearFormDatas(this.formDataProfile, this.formDataPassword);
    this.formProfile = this.formBuilder.group({
      name: [this.user.name? this.user.name : "" , [Validators.required, noWhitespaceValidator(), Validators.minLength(3)]],
      lastName: [this.user.lastName? this.user.lastName: "", [Validators.required, noWhitespaceValidator(), Validators.minLength(3)]],
      email: [this.user.email? this.user.email : "", [Validators.required, Validators.email]],
      country: [this.user.country? this.user.country: ""],
    });
    this.formPassword = this.formBuilder.group({
      currentPassword: ["", [Validators.required,Validators.minLength(8), createPassword()]],
      newPassword: ["", [Validators.required, Validators.minLength(8), createPassword()]],
    });
  }

  clearFormDatas(formDataProfile: FormData,formDataPassword: FormData){
    this.formDataProfile = new FormData();
    this.formDataPassword = new FormData();
  }

  formErrorMessage(fieldName: string) {
    const field = this.formProfile.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("email")) {
      return "Endereço de email inválido";
    }
    if (field?.hasError("whitespace")) {
      return "O campo Título não pode conter apenas espaços em branco.";
    }
    if (field?.hasError("minlength")) {
      return `O campo Título está muito curto`;
    }
    return;
  }

  formErrorMessagePassword(fieldName: string) {
    const field = this.formPassword.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("invalidPassword") || field?.hasError("minLength")) {
      return "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números";
    }
    return;
  }

  triggerFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (this.formDataProfile.has("iconUrl")) {
        this.formDataProfile.delete("iconUrl");
      }

      this.formDataProfile.append("iconUrl", selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  onClick(iten: string) {
    if (iten == "new") {
      this.visibilityNew = !this.visibilityNew;
      if (this.newPassword === "text") {
        this.newPassword = "password";
      } else if (this.newPassword === "password") {
        this.newPassword = "text";
      }
    } else {
      this.visibilityCurrent = !this.visibilityCurrent;
      if (this.currentPassword === "text") {
        this.currentPassword = "password";
      } else if (this.currentPassword === "password") {
        this.currentPassword = "text";
      }
    }
  }

  updateProfile() {
    this.loading = true;
    const id = this.user.id;
    const action = "profile";
    this.formDataProfile.append("name",this.formProfile.value.name);
    this.formDataProfile.append("lastName",this.formProfile.value.lastName);
    this.formDataProfile.append("email",this.formProfile.value.email);
    this.formDataProfile.append("country",this.formProfile.value.country);
    this.profileInfoService.updateProfileService(this.formDataProfile,id).subscribe({
      next: (data) =>  {
        this.loading = false;
        // atualiza os dados do usuário
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        // comunica o resultado
        this.profileActionService.openDialog(action,"success");
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.profileActionService.openDialog(action,"error")
      }
    });
    this.ngOnInit();
  }

  updatePassword(){
    this.loadingPassword = true;
    const id = this.user.id;
    const action = "password";
    this.formDataPassword.append("currentPassword",this.formPassword.value.currentPassword);
    this.formDataPassword.append("newPassword", this.formPassword.value.newPassword);
    this.profileInfoService.updatePasswordService(id, this.formDataPassword).subscribe({
      next: () => {
        this.loadingPassword = false;
        // comunica o resultado
        this.profileActionService.openDialog(action,"success");
      },
      error: (error) => {
        this.loadingPassword = false;
        console.log(error);
        this.profileActionService.openDialog(action,"error")
      }
    });
    this.ngOnInit();
  }
}
