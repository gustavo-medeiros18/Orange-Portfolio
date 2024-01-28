import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { LoginService } from "./services/login.service";
import { ModalActionService } from "src/app/componentes/modal-action/services/modal-action.service";
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

  constructor(private formBuilder: NonNullableFormBuilder, private loginService: LoginService,
    private modalActionService: ModalActionService, private router: Router) {}

  ngOnInit() {
    // Inicialização do formulário
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  // Função para retornar a mensagem de erro do formulário
  formErrorMessage() {
    return "Field required";
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

  // Função de simulação de login assíncrono
  login() {
    this.loading = true;
    const data = new FormData();
    data.append('email', this.form.value.email);
    data.append('password', this.form.value.password);
    if (this.form.invalid) this.onError();
    this.loginService.authenticate(data).subscribe({
      next: () => {
        this.onSuccess();
      },
      error: (error) => {
        this.onError();
      },
    });
    this.loading = false;
  }

  onSuccess() {
    this.router.navigateByUrl('/profile');
  }

  onError() {
    // implementar
  }
}
