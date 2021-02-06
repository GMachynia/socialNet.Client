import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../schema/auth.schema';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: IUser): Observable<any>{
    return of("Test");
  }
}
