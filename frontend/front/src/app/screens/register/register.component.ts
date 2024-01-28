import { Component } from "@angular/core";
import { EmailValidator, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "./services/register.service";
import { Router } from "@angular/router";

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
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  formErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return "Este campo é necessário"; 
    }
    if (field?.hasError('email')){
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
    this.registerService.save(this.form).subscribe({
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
    this.successAlert = true;
    this.errorAlert = false;
    // timeout?
    this.router.navigateByUrl('/login');
  }

  onError() {
    this.errorAlert = true;
    this.successAlert = false;
  }
}
