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

  constructor(private httpClient: HttpClient) {}

  save(record: IUserRegister): Observable<IUserRegister> {
    const apiUrl = new URL(environment.apiUsers, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.post<IUserRegister>(apiUrl,requestBody);
  }

  authenticate(record: IUserLogin) {
    const apiUrl = new URL(environment.apiAuthenticate, this.API).toString();
    const requestBody: string = JSON.stringify(record);
    return this.httpClient.post<IUserLogin>(apiUrl,requestBody);
  }
}
