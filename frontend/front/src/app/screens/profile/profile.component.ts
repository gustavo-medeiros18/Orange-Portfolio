import { FormBuilder } from '@angular/forms';
import { IProjects } from './models/project';
import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //formulário do angular
  searchForm = this.formBuilder.group({
    search: [''],
  });

  //controle de dados do usuário
  user = {
    name: 'Camila Soares',
    locale: 'Brasil',
    profileImg: 'assets/imgs/img_profile_orange_portfolio.png',
  };

  //controle de dados pesquisados
  searchProjects: IProjects[] = [];

  //Array para projetos
  projects: IProjects[] = [
    {
      title: 'teste',
      tags: ['design', 'ui'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
    {
      title: 'teste1',
      tags: ['teste', 'figma', 'photoshop'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
    {
      title: 'teste2',
      tags: ['c++'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        map((value) => value!.trim()),
        filter((value) => value.length > 1),
        debounceTime(300),
        distinctUntilChanged(),
        //tap((value => console.log(value)))),
        switchMap(async (value) => this.handleSearch(value))
      )
      .subscribe();
  }

  handleSearch(value: string) {
    console.log(value);
    for (let projetc of this.projects) {
      for (let i = 0; i <= projetc.tags!.length; i++) {
        if (projetc.tags![i] == value) {
          this.searchProjects.push(projetc);
          console.log(this.searchProjects);
        }
      }
    }
  }
}
