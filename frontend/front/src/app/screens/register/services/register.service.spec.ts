import { TestBed } from "@angular/core/testing";
import { RegisterService } from "./register.service";
import { UserService } from "src/app/appServices/user.service";
import { IUserRegister } from "src/app/models/iUserRegister";
import { of } from "rxjs";

describe("RegisterService", () => {
  let registerService: RegisterService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("UserService", ["save"]);

    TestBed.configureTestingModule({
      providers: [RegisterService, { provide: UserService, useValue: spy }],
    });

    registerService = TestBed.inject(RegisterService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it("should be created", () => {
    expect(registerService).toBeTruthy();
  });

  it("Verifica se está chamando a função corretamente", () => {
    const name = "name";
    const lastName = "lastName";
    const email = "email";
    const password = "password";

    const userRegister: IUserRegister = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };

    userServiceSpy.save.and.returnValue(of(userRegister));

    registerService.save(userRegister);

    expect(userServiceSpy.save).toHaveBeenCalledWith(userRegister);
  });

  it("Verifica se está retornando os dados corretamente", () => {
    const name = "name";
    const lastName = "lastName";
    const email = "email";
    const password = "password";

    const userRegister: IUserRegister = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };

    userServiceSpy.save.and.returnValue(of(userRegister));

    registerService.save(userRegister).subscribe((result) => {
      expect(result).toEqual(userRegister);
    });
  });
});
