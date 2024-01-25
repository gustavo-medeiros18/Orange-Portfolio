import { Injectable } from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { ProjectService } from "src/app/appServices/project.service";
import { IProject } from "src/app/models/iProject";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private projectService: ProjectService) {}

  getProjectsProfile(): Observable<IProject[]> {
    this.projectService.getProjects();

    return new Observable((observer: Observer<IProject[]>) => {
      const projects: IProject[] = [
        {
          title: "teste",
          tags: ["design", "ui"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
        },
        {
          title: "teste1",
          tags: ["teste", "figma"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
        },
        {
          title: "teste2",
          tags: ["c++"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
        },
      ];

      // Emitir os projetos para o observer
      observer.next(projects);

      // Notificar que a emissão de valores está completa
      observer.complete();
    });
  }
}
