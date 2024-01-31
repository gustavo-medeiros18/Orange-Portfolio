import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUserRegister } from "../models/iUserRegister";
import { environment } from "src/environments/environment.development";
import { IUserLogin, LoginResponse } from "../models/iUserLogin";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  save(record: IUserRegister): Observable<IUserRegister> {
    const apiUrl = new URL(environment.apiUsers, this.API).toString();
    return this.httpClient.post<IUserRegister>(apiUrl, record);
  }

  authenticate(record: IUserLogin): Observable<LoginResponse> {
    const apiUrl = new URL(environment.apiAuthenticate, this.API).toString();
    return this.httpClient.post<LoginResponse>(apiUrl, record);
  }
}
