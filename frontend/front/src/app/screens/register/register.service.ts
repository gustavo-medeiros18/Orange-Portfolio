import { Injectable } from '@angular/core';
import { User } from '../login/models/user';
import { IUserRegister } from './models/iuser-register';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() {}

  save(){
      return of();  // Modificar para retornar o observable resultante da requisicao HTTP
  }
}
