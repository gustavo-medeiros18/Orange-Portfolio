import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUserRegister } from "../screens/register/models/iUserRegister";
import { environment } from "src/environments/environment.development";
import { IUserLogin } from "../screens/login/models/iUserLogin";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API = environment.baseUrl;
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient: HttpClient) {}

  save(record: IUserRegister) {
    const apiUrl = new URL(environment.apiRegister, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    this.httpClient.post<IUserRegister>(apiUrl, requestBody, { headers: this.headers }).subscribe();
  }

  authenticate(record: IUserLogin) {
    const apiUrl = new URL(environment.apiAuthenticate, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    this.httpClient.post<IUserLogin>(apiUrl,requestBody,{headers: this.headers}).subscribe();
  }
}
