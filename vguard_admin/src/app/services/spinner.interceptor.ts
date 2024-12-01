
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

  @Injectable()
  export class spinnerInterceptor implements HttpInterceptor {
  
    constructor(private spinner: NgxSpinnerService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      alert();
      this.spinner.show();
  
      return next.handle(request)
        .pipe(
          catchError(error => {
            // Handle errors if needed
            this.spinner.hide();
            return throwError(error);
          }),
          finalize(() => {
            this.spinner.hide();
          })
        );
    }
  }