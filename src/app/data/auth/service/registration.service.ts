import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INewUser } from '../schema/auth.schema';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  registration(user: INewUser): Observable<any>{
    return of("test");
  }
}
