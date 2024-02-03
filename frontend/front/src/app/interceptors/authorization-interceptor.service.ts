import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("/login") || req.url.includes("/auth/google")) {
      return next.handle(req);
    }
    if (req.url.includes("/users") && req.method == "POST"){
      return next.handle(req);
    }
    const token: string = sessionStorage.getItem("token") as string;
    const modifiedReq = req.clone({
      setHeaders: { authorization: `${token}` },
    });
    return next.handle(modifiedReq);
  }
}
