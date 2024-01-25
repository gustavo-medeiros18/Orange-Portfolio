import { ProfileService } from "./services/profile.service";
import { FormBuilder } from "@angular/forms";
import { IProject } from "../../models/iProject";
import { Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from "rxjs";
import { ModalActionService } from "src/app/componentes/modal-action/modal-action.service";

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
    this.searchForm
      .get("search")
      ?.valueChanges.pipe(
        map((value) => value!.trim()),
        filter((value) => value.length > 1),
        debounceTime(300),
        distinctUntilChanged(),
        //tap((value => console.log(value)))),
        switchMap(async (value) => this.handleSearch(value))
      )
      .subscribe();
    this.getAllProjects();
  }

  handleSearch(value: string) {
    this.searchProjects = this.projects.filter(
      (project) => project.tags && project.tags.some((tag) => tag.includes(value))
    );
    this.searchResultEmpty = this.searchProjects.length === 0;
  }

  clearSearch() {
    this.searchProjects.length = 0;
    if (this.searchResultEmpty) {
      this.searchResultEmpty = !this.searchResultEmpty;
    }
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
