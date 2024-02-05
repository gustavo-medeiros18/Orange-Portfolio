import { ProfileService } from "./services/profile.service";
import { FormBuilder } from "@angular/forms";
import { IProject } from "../../models/iProject";
import { Component, OnInit } from "@angular/core";
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { ModalActionService } from "src/app/componentes/modal-action/services/modal-action.service";
import { IUser } from "src/app/models/iUser";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  //formulário do angular
  searchForm = this.formBuilder.group({
    search: [""],
  });

  user$!: Observable<IUser>;
  defaultIcon: string = "assets/imgs/img_profile_orange_portfolio.png";

  //controle de mensagem de pesquisa
  searchResultEmpty: boolean = false;

  //controle de dados pesquisados
  searchProjects: IProject[] = [];

  //Array para projetos
  projects: IProject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private modalActionService: ModalActionService
  ) {
    this.modalActionService.notification.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {

    const userId = JSON.parse(sessionStorage.getItem("id") || "");
    this.user$ = this.profileService.getUserInfo(userId);
    this.projects = [];
    // carregando dados do usuario
    this.getProjectsById(userId);
    this.searchForm
      .get("search")
      ?.valueChanges.pipe(
        map((value) => value!.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(async (value) => {
          this.handleSearch(value);
        })
      )
      .subscribe();
  }

  handleSearch(value: string) {
    const lowerCaseValue = value.toLowerCase();
    this.searchProjects = this.projects.filter((project) => {
      return project.tags && project.tags.some((tag) => tag.toLowerCase().startsWith(lowerCaseValue));
    });
    this.searchResultEmpty = this.searchProjects.length === 0;
  }

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  getProjectsById(id: string) {
    this.profileService.getProjectsByUserIdProfile(id).subscribe({
      next: (projects: IProject[]) => {
        projects.forEach(projectData => {
          const project: IProject = this.profileService.fillProjectProfile(projectData);
          this.projects.push(project);
        })
      },
      error: (error) => {
        console.error("Erro ao recuperar projetos:", error);
      },
    });
  }
}
