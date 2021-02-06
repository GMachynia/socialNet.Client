import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../schema/auth.schema';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  
  login(user: IUser): Observable<any>{
    return of("Test");
  }

  public logout() {
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
}

}
