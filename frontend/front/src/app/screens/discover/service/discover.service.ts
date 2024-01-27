import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { ProjectService } from "src/app/appServices/project.service";
import { IProject } from "src/app/models/iProject";

@Injectable({
  providedIn: "root",
})
export class DiscoverService {
  constructor(private projectService: ProjectService) {}

  getProjectsDiscover(): Observable<IProject[]> {
    this.projectService.getProjects();

    return new Observable((observer: Observer<IProject[]>) => {
      const projects: IProject[] = [
        {
          title: "teste",
          tags: ["design", "teste"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
          id: 1,
          firstName: "Carolina",
          lastName: "Valentin"
        },
        {
          title: "teste1",
          tags: ["teste", "figma"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
          id: 2,
          firstName: "Enzo",
          lastName: "Gabriel"
        },
        {
          title: "teste2",
          tags: ["c++"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/10",
          id: 3,
          firstName: "Bianca",
          lastName: "Martin"
        },
        {
          title: "teste",
          tags: ["design", "teste"],
          link: "https://github.com/costaowillian/cashquest",
          description: "teste, teste, teste",
          img: "assets/imgs/img_landingpage_orange_portfolio.svg",
          releaseDate: "12/23 ",
          id: 4,
          firstName: "Alice",
          lastName: "Alexandra"
        },
      ];

      // Emitir os projetos para o observer
      observer.next(projects);

      // Notificar que a emissão de valores está completa
      observer.complete();
    });
  }
}
