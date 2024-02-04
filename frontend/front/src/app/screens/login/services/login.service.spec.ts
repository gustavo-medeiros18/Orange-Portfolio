import { TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { LoginService } from "./login.service";
import { LoginAppService } from "src/app/appServices/login-app.service";
import { of } from "rxjs";

describe("LoginService", () => {
  let loginService: LoginService;
  let authServiceSpy: jasmine.SpyObj<LoginAppService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("LoginAppService", ["authUser"]);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        LoginService,
        { provide: LoginAppService, useValue: spy },
      ],
    });

    loginService = TestBed.inject(LoginService);
    authServiceSpy = TestBed.inject(LoginAppService) as jasmine.SpyObj<LoginAppService>;
  });

  it("should be created", () => {
    expect(loginService).toBeTruthy();
  });

  describe("Autenticação", () => {

    it("Deve enviar os dados corretamente", () => {
      const email = "email@gmail.com";
      const password = "password";
  
      const form = new FormBuilder().group({
        email: email,
        password: password,
      });
  
      loginService.authenticate(form);
  
      expect(authServiceSpy.authUser).toHaveBeenCalledWith({
        email: email,
        password: password,
      });
    });

    it("Verifica se, caso o login seja encontrado no banco, retorna true corretamente no service", () => {
      const form = new FormBuilder().group({
        email: "email@gmail.com",
        password: "password",
      });

      authServiceSpy.authUser.and.returnValue(of(true));

      let result: boolean | undefined;
      loginService.authenticate(form).subscribe((res) => (result = res));

      expect(result).toBe(true);
    });
  });
});