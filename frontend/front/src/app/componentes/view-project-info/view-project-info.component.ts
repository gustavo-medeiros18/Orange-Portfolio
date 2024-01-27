import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProject } from 'src/app/models/iProject';

@Component({
  selector: 'app-view-project-info',
  templateUrl: './view-project-info.component.html',
  styleUrls: ['./view-project-info.component.scss'],
})
export class ViewProjectInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public modal: IProject){}
}
