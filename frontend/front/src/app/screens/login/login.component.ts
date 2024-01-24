import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Formulário do Angular
  form!: FormGroup;

  // Controle de visibilidade da senha
  visibility: boolean = false;

  // Senha, inicialmente oculta
  password: string = 'password';

  // Variável de controle para o estado de carregamento
  loading: boolean = false;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit() {
    // Inicialização do formulário
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  // Função para retornar a mensagem de erro do formulário
  formErrorMessage() {
    return 'Field required';
  }

  // Função para alternar a visibilidade da senha
  onClick() {
    this.visibility = !this.visibility;
    if (this.password === 'text') {
      this.password = 'password';
    } else if (this.password === 'password') {
      this.password = 'text';
    }
  }

  // Função de simulação de login assíncrono
  login() {
    this.loading = true;

    // Simula uma operação assíncrona (por exemplo, uma requisição HTTP)
    // Deve ser alterado quando implementar o service de autenticação!
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
