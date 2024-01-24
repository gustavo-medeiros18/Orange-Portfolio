import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';;
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  hide = true;
  visibility: boolean = false;
  password: string = 'password';
  form!: FormGroup;

  // Variável de controle para o estado de carregamento
  loading: boolean = false;
  // Variavel para exibicao da mensagem de sucesso ( mudar posteriormente ) 
  successAlert: boolean = true;

  constructor(private formBuilder: NonNullableFormBuilder, private service: RegisterService) {}

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

    const teste: boolean = true;
    if (teste){
      this.onSuccess();
    } else {
      this.onError();
    }

  }

  onSuccess(){
  }

  onError(){
  }

}
