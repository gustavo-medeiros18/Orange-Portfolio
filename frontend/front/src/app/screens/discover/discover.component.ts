import { IProject } from "src/app/models/iProject";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { ProfileService } from "../profile/services/profile.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.scss"],
})
export class DiscoverComponent implements OnInit {
  searchForm = this.formBuilder.group({
    search: [""],
  });

  //controle de mensagem de pesquisa
  searchResultEmpty: boolean = false;
  
  //controle de dados pesquisados
  searchProjects: IProject[] = [];

  //Array para projetos
  projects: IProject[] = [];

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getAllProjects();
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

  handleSearch(value: string) {
    this.searchProjects = this.projects.filter((project) => {
      return project.tags && project.tags.some((tag) => tag.startsWith(value));
    });
    this.searchResultEmpty = this.searchProjects.length === 0;
  }
}
