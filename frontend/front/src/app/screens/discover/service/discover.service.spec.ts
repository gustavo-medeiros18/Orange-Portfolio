import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DiscoverService } from './discover.service';
import { ProjectService } from 'src/app/appServices/project.service';
import { IProject } from 'src/app/models/iProject';

describe('DiscoverService', () => {
  let discoverService: DiscoverService;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProjectService', ['getProjects', 'fillProject']);

    TestBed.configureTestingModule({
      providers: [
        DiscoverService,
        { provide: ProjectService, useValue: spy },
      ],
    });

    discoverService = TestBed.inject(DiscoverService);
    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
  });

  it('should be created', () => {
    expect(discoverService).toBeTruthy();
  });

  it('Deve recuperar todos os projetos da aplicação', () => {
    const projects: IProject[] = [
      {
        id: "1",
        title: 'Projeto 1',
        tags: ['tag1', 'tag2'],
        description: 'Descrição 1',
        createdAt: '2024-02-04T12:00:00',
      },
      {
        id: "2",
        title: 'Projeto 2',
        tags: ['tag1', 'tag2'],
        description: 'Descrição 2',
        createdAt: '2024-02-04T12:00:00',
      },
    ];
    projectServiceSpy.getProjects.and.returnValue(of(projects));

    discoverService.getProjectsDiscover().subscribe((result) => {
      expect(result).toEqual(projects);
    });

    expect(projectServiceSpy.getProjects).toHaveBeenCalled();
  });
});