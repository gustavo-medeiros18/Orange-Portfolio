import { Injectable } from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { ProjectService } from "src/app/appServices/project.service";
import { UserService } from "src/app/appServices/user.service";
import { IProject } from "src/app/models/iProject";
import { IUser } from "src/app/models/iUser";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private projectService: ProjectService, private userService: UserService) {}

  getProjectsByUserIdProfile(id: string): Observable<IProject[]> {
    return this.projectService.getProjectsByUserId(id);
  }

  fillProjectProfile(projectData: IProject): IProject{
    return this.projectService.fillProject(projectData);
  }

  getUserInfo(id: string): Observable<IUser>{
    return this.userService.getUserById(id);
  }

}
