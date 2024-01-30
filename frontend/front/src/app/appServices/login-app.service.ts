import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import * as CryptoJS from "crypto-js";
import { UserService } from "./user.service";
import { IUserLogin } from "../models/iUserLogin";

@Injectable({
  providedIn: "root",
})
export class LoginAppService {
  private readonly API = environment.baseUrl;
  criptKey: string = environment.apiKey;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  authUser(data: IUserLogin) {
    this.userService.authenticate(data).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  signOut = () => {
    localStorage.removeItem("token");
  };

  // Método para criptografar texto usando a chave
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.criptKey).toString();
  }

  // Método para descriptografar texto usando a chave
  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.criptKey).toString(CryptoJS.enc.Utf8);
  }

  loginWithGoogle(credentials: string): Observable<any> {
    const apiUrl = new URL(environment.apiLoginGoogle, this.API);
    const requestBody = JSON.stringify(credentials);
    return this.httpClient.post(environment.apiLoginGoogle, requestBody);
  }

  getAuthorizationToken(item: string) {
    const localItem = this.decrypt(window.localStorage.getItem(item) ?? "");
    return localItem;
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken("token");
    if (!token) {
      return false;
    }

    return true;
  }
}
