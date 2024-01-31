import { Injectable } from '@angular/core';
import { ProjectService } from 'src/app/appServices/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCardService {

  constructor(private projectService: ProjectService) { }

  deleteProjectCard(id: string) {
    return this.projectService.deleteProject(id);
  }
  
}
