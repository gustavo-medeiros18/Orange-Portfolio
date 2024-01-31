import { ProfileService } from "./services/profile.service";
import { FormBuilder } from "@angular/forms";
import { IProject } from "../../models/iProject";
import { Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { ModalActionService } from "src/app/componentes/modal-action/services/modal-action.service";

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

  // usuario logado
  user: any;

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
  ) {}

  ngOnInit(): void {
    // carregando dados do usuario
    this.user = JSON.parse(sessionStorage.getItem("userInfo") || "");
    this.user.iconUrl = this.user.iconUrl ? this.user.iconUrl : "assets/imgs/img_profile_orange_portfolio.png";
    this.getProjectsById(this.user.id);
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
    this.searchProjects = this.projects.filter((project) => {
      return project.tags && project.tags.some((tag) => tag.startsWith(value));
    });
    this.searchResultEmpty = this.searchProjects.length === 0;
  }

  openDialog(name: string) {
    this.modalActionService.openDialog(name);
  }

  getProjectsById(id: number) {
    this.profileService.getProjectsByIdProfile(id).subscribe({
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
