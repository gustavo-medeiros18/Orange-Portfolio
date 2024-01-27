import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/appServices/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCardService {

  constructor(private projectService: ProjectService) { }

  onDelete(id: int) {
    this.projectService.delete(id);
    return of();
  }
}
