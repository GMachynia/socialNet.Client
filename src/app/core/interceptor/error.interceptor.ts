import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@app/service/auth.service';

interface IError {
  errorMessage: string,
  errorStatusCode: number
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this._authService.logout();
                location.reload();
            }
            const error: IError = {
              errorMessage: err.error.message,
              errorStatusCode: err.statusText  
            } 
            return throwError(error);
        }));
    }
}
