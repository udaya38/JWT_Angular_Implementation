import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { map, filter, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  token: string;
  constructor(private tokenService: TokenService, private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.tokenService.getTokenValue();
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq).pipe(catchError((event: HttpErrorResponse)=>{
          console.log(event)
          if(event?.status === 401){
            this.route.navigate(['/','login']);
          }
          return new Observable<HttpEvent<any>>();
      }));
    }
    
    return next.handle(req);
  }
}
