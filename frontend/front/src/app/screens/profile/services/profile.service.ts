import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/appServices/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private projectService: ProjectService) { }

  getProjectsProfile() {
    this.projectService.getProjects();
    return of();
  }

}
