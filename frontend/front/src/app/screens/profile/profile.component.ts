import { FormBuilder, Validators } from '@angular/forms';
import { IProjects } from './models/project';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

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

  //Array para projetos
  projects: IProjects[] = [
    {
      title: 'teste',
      tags: ['ux', 'ui'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
    {
      title: 'teste1',
      tags: ['ux', 'ui'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
    {
      title: 'teste2',
      tags: ['ux', 'ui'],
      link: 'https://github.com/costaowillian/cashquest',
      description: 'teste, teste, teste',
      img: 'assets/imgs/img_landingpage_orange_portfolio.svg',
      releaseDate: '12/10',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {

  }
}
