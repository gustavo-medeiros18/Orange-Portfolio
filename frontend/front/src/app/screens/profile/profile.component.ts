import { IProjects } from './models/project';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  //Array para projetos
  projects: IProjects[] = [];

  constructor() {}
}
