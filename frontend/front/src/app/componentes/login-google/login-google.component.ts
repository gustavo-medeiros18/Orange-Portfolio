import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit{

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document){}

  ngOnInit() {
    this.loadGoogleSignInScript();
  }

  loadGoogleSignInScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
  
    this.renderer.appendChild(this.document.body, script);
  }

}