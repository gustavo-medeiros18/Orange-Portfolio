import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  visibility: boolean = false;
  password: string = 'password';

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
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
}
