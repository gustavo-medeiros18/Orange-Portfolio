import { IProject } from 'src/app/models/iProject';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProjectEvent, ProjecEventEnum } from 'src/app/models/iProject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectMobileService {

  private emitter: Subject<IProjectEvent<ProjecEventEnum, IProject>> = new Subject<
    IProjectEvent<ProjecEventEnum, IProject>
  >();

  currentProject: IProjectEvent<ProjecEventEnum, IProject> | null = null;
  constructor(private router: Router) { }

  openPage() {
    this.router.navigate(['/project']);
  }

  public dispatch(action: IProjectEvent<ProjecEventEnum, IProject>) {
    this.emitter.next({ ...action });
  }

  clearProjectInfo(): void {
    this.currentProject = null;
  }
}
