import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { UserService } from "./user.service";
import { IUserLogin, LoginResponse } from "../models/iUserLogin";

@Injectable({
  providedIn: "root",
})
export class LoginAppService {
  private readonly API = environment.baseUrl;
  criptKey: string = environment.apiKey;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  authUser(data: IUserLogin): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.authenticate(data).subscribe({
        next: (result: LoginResponse) => {
          sessionStorage.setItem("id",JSON.stringify(result.dtoUser.id));
          sessionStorage.setItem("token", result.token);
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }

  signOut = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
  };

  getAuthorizationToken(item: string) {
    const localItem =  window.sessionStorage.getItem(item) ?? "";
    return localItem;
  }
  private safeBase64Decode(base64String: string): string | null {
    try {
      const safeBase64String = base64String.replace(/-/g, "+").replace(/_/g, "/");
      return atob(safeBase64String);
    } catch (error) {
      console.error("Error decoding base64 string:", error);
      return null;
    }
  }

  isTokenExpired(token: string) {
    if (!token) {
      return true;
    }

    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        console.error("The token is not in the expected JWT format");
        return true;
      }
      const decodedPayload = this.safeBase64Decode(tokenParts[1]);
      if (!decodedPayload) {
        console.error("Failed to decode token payload");
        return true;
      }
      const payload = JSON.parse(decodedPayload);
      const expirationTimeInSeconds = payload.exp;
      const expirationTimeInMillis = expirationTimeInSeconds * 1000;
      const now = Date.now();
      return now >= expirationTimeInMillis;
    } catch (error) {
      console.error("Error validating token expiration:", error);
      return true;
    }
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken("token");
    return !this.isTokenExpired(token);
  }
}
