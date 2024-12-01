import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, catchError, finalize, throwError } from 'rxjs';
export class myInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    return next.handle(request)
      .pipe(
        catchError(error => {
          // Handle errors if needed
          return throwError(error);
        }),
        finalize(() => {
          this.spinner.hide();
        })
      );
  }
}
