import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "./services/register.service";
import { Router } from "@angular/router";
import { createPassword, noWhitespaceValidator } from "../../Validators/validators";
import { first } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.scss"],
})
export class RegisterComponent {
  visibility: boolean = false;
  password: string = "password";

  form!: FormGroup;

  // Variável de controle para o estado de carregamento
  loading: boolean = false;
  // Variaveis  para exibicao da mensagem de sucesso/erro
  successAlert: boolean = false;
  errorAlert: boolean = false;

  hasError: string = "";

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(3)]],
      lastName: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), createPassword()]],
    });
  }

  formErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("email")) {
      return "Endereço de email inválido";
    }
    if (field?.hasError("invalidPassword") || field?.hasError("minLength")) {
      return "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números";
    }
    if (field?.hasError("whitespace")) {
      return "O campo não pode conter apenas espaços em branco.";
    }
    if (field?.hasError("minlength")) {
      return `O campo está muito curto`;
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

  // Função de simulação de login assíncrono
  signUp() {
    this.loading = true;

    if (this.form.invalid) {
      this.onError();
      this.loading = false;
      return;
    }
    this.registerService
      .save(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.onSuccess();
        },
        error: (error) => {
          console.log(error.status);
          if (error.status === 409) {
            this.hasError = "Este e-mail já está cadastrado.";
            this.loading = false;
            this.onError();
          } else {
            this.hasError = "Ocorreu um erro ao tentar realizar o cadastro";
            this.loading = false;
            this.onError();
          }
        },
      });
  }

  onSuccess() {
    this.errorAlert = false;
    this.successAlert = true;
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 1500);
  }

  onError() {
    this.successAlert = false;
    this.errorAlert = true;
  }

  isButtonDisabled(): boolean {
    return this.form.invalid;
  }
}
