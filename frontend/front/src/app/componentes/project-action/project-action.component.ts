import { Component, Inject,OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModalAction } from "../models/iModalAction";
@Component({
  selector: "app-project-action",
  templateUrl: "./project-action.component.html",
  styleUrls: ["./project-action.component.scss"],
})
export class ProjectActionComponent implements OnInit {
  title: string = "";
  icon: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public modal: IModalAction) {}

  ngOnInit() {
    this.handleData(this.modal.action, this.modal.result);
  }


  handleData(action: string, result: string) {
    switch (action) {
      case "adicionar":
        this.title = "Projeto adicionado";
        break;
      case "editar":
        this.title = "Projeto editado";
        break;
      case "deletar":
        this.title = "Projeto deletado";
        break;
      default:
        break;
    }
    if (result === "success") {
      this.title = `${this.title} com sucesso!`;
      this.icon = result;
    } else if (result === "error") {
      this.title = `Erro ao ${action} projeto!`;
      this.icon = result;
    }
  }
}
