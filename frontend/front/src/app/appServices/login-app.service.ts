import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import * as CryptoJS from "crypto-js";
import { UserService } from "./user.service";
import { IUserLogin, LoginResponse } from "../models/iUserLogin";

@Injectable({
  providedIn: "root",
})
export class LoginAppService {
  private readonly API = environment.baseUrl;
  criptKey: string = environment.apiKey;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  authUser(data: IUserLogin): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.authenticate(data).subscribe({
        next: (result: LoginResponse) => {
          window.localStorage.setItem("token", this.encrypt(result.token));
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          observer.next(false);
          observer.complete();
        },
      });
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

  isTokenExpired(token: string) {
    //se não tiver token retorna true, considerando como expirado
    if(!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTimeInSeconds = payload.exp;

      const expirationTimeInMillis = expirationTimeInSeconds * 1000;

      const now = Date.now();
      if (now >= expirationTimeInMillis) {
        return true;
      } else {
          return false;
      }
    }
    catch (error) {
      console.error('Erro ao decodificar ou verificar a expiração do token:', error);
      return true;
    }
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken("token");
    return !this.isTokenExpired(token);
  }
}
