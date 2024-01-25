import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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
