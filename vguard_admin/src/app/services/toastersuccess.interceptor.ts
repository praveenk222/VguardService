// http-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status === 200) {
          console.log(event)
          // Show success toast for successful responses
          if(event.body.status){

            this.toastr.success(event.body.message, 'Success');
          }
        }
      })
    );
  }
}
