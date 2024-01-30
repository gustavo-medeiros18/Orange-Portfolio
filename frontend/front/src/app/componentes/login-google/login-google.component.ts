import {Component, ElementRef, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { accounts } from "google-one-tap";
import { ViewChild } from '@angular/core';
import { LoginAppService } from 'src/app/appServices/login-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {

  @ViewChild('buttonDiv') buttonDiv!: ElementRef;

  constructor(private loginAppService: LoginAppService, private router: Router,
  private _ngZone: NgZone){}

  ngOnInit(): void {
    // config. login com o google
    window.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "102685364306-m0ssdqq50ier1aqn5eulgr4eto0qidev.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
       });
      // carregamento do botao
       if (this.buttonDiv.nativeElement){
         window.google.accounts.id.renderButton(
           this.buttonDiv.nativeElement,
            {theme: "outline", size: "large", width: 50, text: "signin_with"}
          );
       }
       window.google.accounts.id.prompt((notification: google.PromptMomentNotification) => {});
    }
  }

  handleCredentialResponse(response: google.CredentialResponse){
    this.loginAppService.loginWithGoogle(response.credential).subscribe({
      next: (data) => {
        localStorage.setItem("token",data.token);
        this._ngZone.run(() => {
          this.router.navigateByUrl("/profile");
        })},
      error: (error) => {
        console.log(error);
      },
    });
  }
}
