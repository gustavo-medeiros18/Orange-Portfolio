import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class LoginAppService {
  private readonly API = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  signOut = () => {
    localStorage.removeItem("token");
  };

  loginWithGoogle(credentials: string): Observable<any> {
    const apiUrl = new URL(environment.apiLoginGoogle, this.API);
    const requestBody = JSON.stringify(credentials);
    return this.httpClient.post(environment.apiLoginGoogle, requestBody);
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken("token");
    if(!token) {
      return false;
    }

    return true;
  }
}
