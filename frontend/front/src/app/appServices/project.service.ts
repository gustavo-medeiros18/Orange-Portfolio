import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.development";
import { IProject } from "../models/iProject";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private readonly API = environment.baseUrl;
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient: HttpClient) {}

  createProject(params: IProject): Observable<boolean> {
    const apiUrl = new URL(environment.apiDeleteProjects, this.API).toString();
    const requestBody: string = JSON.stringify(params);
    this.httpClient.post<IProject>(apiUrl, requestBody, { headers: this.headers });
    return of();
  }

  getProjects(): Observable<IProject[]> {
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    this.httpClient.get<IProject[]>(apiUrl, { headers: this.headers });
    return of();
  }

  patchProject(params: IProject): Observable<boolean> {
    const apiUrl = new URL(environment.apiPatchProjects, this.API).toString();
    const requestBody: string = JSON.stringify(params);
    this.httpClient.patch<IProject>(apiUrl, requestBody, { headers: this.headers });
    return of();
  }

  deleteProject(id: number): Observable<boolean> {
    const apiUrl = new URL(environment.apiDeleteProjects, this.API).toString();
    this.httpClient.delete<IProject>(apiUrl, { headers: this.headers });
    return of();
  }
}
