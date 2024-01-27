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

  //controle de mensagem de pesquisa
  searchResultEmpty: boolean = false;

  //controle de dados pesquisados
  searchProjects: IProject[] = [];

  //Array para projetos
  projects: IProject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalActionService: ModalActionService
  ) {}

  ngOnInit(): void {
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
}
