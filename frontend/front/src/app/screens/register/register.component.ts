import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "./services/register.service";
import { Router } from "@angular/router";
import { createPassword, noWhitespaceValidator } from "../../Validators/validators";

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

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(5)]],
      lastName: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(5)]],
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
      return "O campo Título não pode conter apenas espaços em branco.";
    }
    if (field?.hasError("minlength")) {
      return `O campo Título está muito curto`;
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
    // Simula uma operação assíncrona (por exemplo, uma requisição HTTP)
    // Deve ser alterado quando implementar o service de autenticação!
    if (this.form.invalid) {
      this.onError();
      this.loading = false;
      return;
    }
    this.registerService.save(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.onSuccess();
      },
      error: (error) => {
        this.loading = false;
        this.onError();
      },
    });
  }

  onSuccess() {
    this.successAlert = true;
    this.errorAlert = false;
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 1500);
  }

  onError() {
    this.errorAlert = true;
    this.successAlert = false;
  }
}
