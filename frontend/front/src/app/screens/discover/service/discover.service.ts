import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectService } from "src/app/appServices/project.service";
import { IProject } from "src/app/models/iProject";

@Injectable({
  providedIn: "root",
})
export class DiscoverService {
  constructor(private projectService: ProjectService) {}

  getProjectsDiscover(): Observable<IProject[]> {
  return this.projectService.getProjects();
  }

  fillProjectDiscover(projectData: IProject): IProject{
    return this.projectService.fillProject(projectData);
  }
}
