import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalAction } from '../models/iModalAction';

@Component({
  selector: 'app-profile-action',
  templateUrl: './profile-action.component.html',
  styleUrls: ['./profile-action.component.scss']
})
export class ProfileActionComponent implements OnInit {

  title: string = "";
  icon: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public modal: IModalAction) {}

  ngOnInit() {
    this.handleData(this.modal.action, this.modal.result);
  }

  handleData(action: string, result: string) {
    switch (action) {
      case "profile":
        this.title = "Perfil editado";
        break;
      case "password":
        this.title = "Senha editada";
        break;
      default:
        break;
    }
    if (result === "success") {
      this.title = `${this.title} com sucesso!`;
      this.icon = result;
    } else if (result === "error") {
      this.title = `Erro ao editar perfil!`;
      this.icon = result;
    }
  }

}
