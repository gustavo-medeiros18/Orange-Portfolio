import { Component, Inject, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModal } from "./models/modal";

@Component({
  selector: "app-modal-action",
  templateUrl: "./modal-action.component.html",
  styleUrls: ["./modal-action.component.scss"],
})
export class ModalActionComponent {
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public modal: IModal) {}
}
