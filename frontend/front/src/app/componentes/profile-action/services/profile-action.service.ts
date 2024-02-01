import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProfileActionComponent } from "../profile-action.component";

@Injectable({
  providedIn: "root",
})
export class ProfileActionService {
  constructor(private dialog: MatDialog) {}

  openDialog(action: string, result: string) {
    const isMobile = window.innerWidth <= 992;
    const position = isMobile && action != "deletar" ? { top: "11.87rem" } : {};
    const dialogRef = this.dialog.open(ProfileActionComponent, {
      width: "21.9375rem",
      height: "15.125rem",
      data: { action: action, result: result },
      position,
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
