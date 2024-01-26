import { ProfileService } from "./services/profile.service";
import { FormBuilder } from "@angular/forms";
import { IProject, ProjecEventEnum } from "../../models/iProject";
import { Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from "rxjs";
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

  //controle de mensagem de pesquisa
  searchResultEmpty: boolean = false;

  //controle de dados do usuário
  user = {
    name: "Camila Soares",
    locale: "Brasil",
    profileImg: "assets/imgs/img_profile_orange_portfolio.png",
  };

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
    this.getAllProjects();
    this.searchForm
      .get("search")
      ?.valueChanges.pipe(
        map((value) => value!.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        //tap((value => console.log(value)))),
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

  getAllProjects() {
    this.profileService.getProjectsProfile().subscribe({
      next: (projects: IProject[]) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error("Erro ao recuperar projetos:", error);
      },
    });
  }
}
