import { TestBed } from "@angular/core/testing";
import { ProfileService } from "./profile.service";
import { ProjectService } from "src/app/appServices/project.service";
import { IProject } from "src/app/models/iProject";
import { IUser } from "src/app/models/iUser";
import { of } from "rxjs";
import { UserService } from "src/app/appServices/user.service";

describe("Profile Service", () => {
  let profileService: ProfileService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj("UserService", ["getUserById"]);

    TestBed.configureTestingModule({
      providers: [ProfileService, { provide: UserService, useValue: userSpy }],
    });

    profileService = TestBed.inject(ProfileService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it("deve retornar as informações do usuário pelo ID", () => {
    const user: IUser = {
      id: "123",
      name: "Nome",
      lastName: "Sobrenome",
      email: "email",
      country: "país",
      iconUrl: "ícone",
    };

    userServiceSpy.getUserById.and.returnValue(of(user));

    profileService.getUserInfo(user.id).subscribe((result) => {
      expect(result).toEqual(user);
      expect(userServiceSpy.getUserById).toHaveBeenCalledWith(user.id);
    });
  });

  it("Deve retornar os projetos de um usuário pelo ID", () => {
    const userId = "123";
    const projects: IProject[] = [
      {
        title: "Projeto 1",
        tags: ["tag1", "tag2"],
        description: "Descrição 1",
        createdAt: "2024-02-04T12:00:00Z",
      },
      {
        title: "Projeto 2",
        tags: ["tag3", "tag4"],
        description: "Descrição 2",
        createdAt: "2024-02-05T12:00:00Z",
      },
    ];

    projectServiceSpy.getProjectsByUserId.and.returnValue(of(projects));

    profileService.getProjectsByUserIdProfile(userId).subscribe((result) => {
      expect(result).toEqual(projects);

      expect(projectServiceSpy.getProjectsByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
