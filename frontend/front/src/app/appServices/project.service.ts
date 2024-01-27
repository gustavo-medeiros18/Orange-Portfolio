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

  getProjects(): Observable<IProject[]> {
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    this.httpClient.get<IProject[]>(apiUrl, { headers: this.headers });
    return of();
  }
}
