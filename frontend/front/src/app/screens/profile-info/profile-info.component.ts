import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  visibility: boolean = false;
  password: string = "password";

  formProfile!: FormGroup;

  formPassword!: FormGroup;

  loading: boolean = false;
  hasError: string = ""

  constructor(
    private formBuilder: NonNullableFormBuilder,
  ) {}

  ngOnInit() {
    this.formProfile = this.formBuilder.group({
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      country: ["", [Validators.required]],
    });
    this.formPassword = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
    });
  }

  formErrorMessage(fieldName: string) {
    const field = this.formProfile.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("email")) {
      return "Endereço de email inválido";
    }
    return;
  }

  onClick() {
    this.visibility = !this.visibility;
    if (this.password === "text") {
      this.password = "password";
    } else if (this.password === "password") {
      this.password = "text";
    }
  }
}
