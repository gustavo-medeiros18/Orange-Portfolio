import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  hide = true;
  visibility: boolean = false;
  password: string = 'password';
  form!: FormGroup;

  // Variável de controle para o estado de carregamento
  loading: boolean = false;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  formErrorMessage() {
    return 'Field required';
  }

  onClick() {
    this.visibility = !this.visibility;
    if (this.password === 'text') {
      this.password = 'password';
    } else if (this.password === 'password') {
      this.password = 'text';
    }
  }

  // Função de simulação de login assíncrono
  singUp() {
    this.loading = true;

    // Simula uma operação assíncrona (por exemplo, uma requisição HTTP)
    // Deve ser alterado quando implementar o service de autenticação!
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
