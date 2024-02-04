import { TestBed } from "@angular/core/testing";
import { ProfileInfoService } from "./profile-info.service";
import { UserService } from "src/app/appServices/user.service";
import { IUser } from "src/app/models/iUser";
import { of } from "rxjs";
import { IUserUpdatePassword } from "src/app/models/iUserUpdatePassword";

describe("ProfileInfoService", () => {
  let service: ProfileInfoService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("UserService", [
      "updateProfile",
      "updatePassword",
      "isGoogleLogin",
      "getUserById",
    ]);

    TestBed.configureTestingModule({
      providers: [ProfileInfoService, { provide: UserService, useValue: spy }],
    });

    service = TestBed.inject(ProfileInfoService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Deve atualizar os dados do perfil do usuário", () => {
    const formData = new FormData();
    const id = "123";
    const name = "Nome";
    const lastName = "Sobrenome";
    const email = "email@gmail.com";
    const country = "Brasil";
    const iconUrl = "";
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("iconUrl", "");
    userServiceSpy.updateProfile.and.returnValue(of({} as IUser));

    service.updateProfileService(formData, id).subscribe(() => {
      // verifica se foi chamada corretamente
      expect(userServiceSpy.updateProfile).toHaveBeenCalledWith(formData, id);
    });

    const updatedUserData: IUser = {
      id: id,
      name: name,
      lastName: lastName,
      email: email,
      country: country,
      iconUrl: "",
    };

    userServiceSpy.updateProfile.and.returnValue(of(updatedUserData));

    service.updateProfileService(formData, id).subscribe((userData) => {
      // verifica se os dados atualizados estão corretos
      expect(userData).toEqual(updatedUserData);
    });
  });

  it("Deve atualizar os dados da senha do usuário", () => {
    const id = "123";
    const formData = new FormData();
    const user: IUserUpdatePassword = {
      id: id,
      currentPassword: "currentPassword",
      newPassword: "newPassword",
    };
    userServiceSpy.updatePassword.and.returnValue(of({} as IUserUpdatePassword));

    service.updatePasswordService(id, formData);

    // verifica se chamou a função corretamente
    expect(userServiceSpy.updatePassword).toHaveBeenCalledWith(user);
  });
});