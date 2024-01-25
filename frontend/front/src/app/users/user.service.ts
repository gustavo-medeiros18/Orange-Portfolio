import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../screens/register/models/iuser-register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = environment.baseUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  
  constructor(private httpClient: HttpClient) { }
  
  save(record: IUserRegister) {
    const apiUrl = new URL(environment.apiRegister,this.API).toString();
    const requestBody: string = JSON.stringify(record);
    this.httpClient.post<IUserRegister>(apiUrl, requestBody, { headers: this.headers }).subscribe();
  }
}
