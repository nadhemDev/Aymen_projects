import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserserviceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // SKIP adding token to auth/login requests
    if (req.url.includes('/auth') || req.url.includes('/login')) {
      console.log('Interceptor: Skipping auth request');
      return next.handle(req);
    }

    const token = this.authService.getToken();
    
    if (token) {
      console.log('Interceptor: Adding token to request');
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedRequest);
    }
    
    console.log('Interceptor: No token found');
    return next.handle(req);
  }
}