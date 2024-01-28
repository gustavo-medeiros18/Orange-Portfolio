import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUserRegister } from "../models/iUserRegister";
import { environment } from "src/environments/environment.development";
import { IUserLogin } from "../models/iUserLogin";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API = environment.baseUrl;
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient: HttpClient) {}

  save(record: IUserRegister): Observable<IUserRegister> {
    const apiUrl = new URL(environment.apiRegister, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.post<IUserRegister>(apiUrl, requestBody, { headers: this.headers });
  }

  authenticate(record: IUserLogin) {
    const apiUrl = new URL(environment.apiAuthenticate, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    this.httpClient.post<IUserLogin>(apiUrl,requestBody,{headers: this.headers});
    //  implementar Logica de autenticacao
    return new Observable((observer) => {
      observer.next();
    });
  }
}
