import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { LoginService } from "./services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // Formulário do Angular
  form!: FormGroup;

  // Controle de visibilidade da senha
  visibility: boolean = false;

  // Senha, inicialmente oculta
  password: string = "password";

  // Variável de controle para o estado de carregamento
  loading: boolean = false;

  hasError: string = "";

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicialização do formulário
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  // Função para retornar a mensagem de erro do formulário
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

  // Função para alternar a visibilidade da senha
  onClick() {
    this.visibility = !this.visibility;
    if (this.password === "text") {
      this.password = "password";
    } else if (this.password === "password") {
      this.password = "text";
    }
  }

  login() {
    if (this.form.invalid) {
      this.onError(true);
      return;
    }
    this.loading = true;
    this.loginService.authenticate(this.form).subscribe({
      next: (result: boolean) => {
        if (result) {
          this.loading = false;
          this.onSuccess();
        } else {
          this.loading = false;
          this.onError(false);
        }
      },
      error: () => {
        this.loading = false;
        this.onError(false);
      },
    });
  }

  onSuccess() {
    this.router.navigateByUrl("/profile");
  }

  onError(isForms: boolean) {
    if (isForms) {
      this.hasError = "Preencha todos os campos";
    } else {
      this.hasError = "Credenciais inválidas";
    }
  }
}
