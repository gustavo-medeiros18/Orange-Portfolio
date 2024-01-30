import { Injectable } from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { ProjectService } from "src/app/appServices/project.service";
import { IProject } from "src/app/models/iProject";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private projectService: ProjectService) {}

  getProjectsByIdProfile(id: number): Observable<IProject[]> {
    return this.projectService.getProjectsById(id);
  }

  fillProjectProfile(projectData: IProject): IProject{
    return this.projectService.fillProject(projectData);
  }

}
