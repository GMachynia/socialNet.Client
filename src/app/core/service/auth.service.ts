import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/*';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export type IUserCredentials = Pick<IUser, "username" | "password">;
interface IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router) { 
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(credentials: IUserCredentials) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/User/login`, credentials)
      .pipe(
        tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._router.navigate(['/auth/login']);
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public get currentUsernameValue(): string {
    return this.currentUserSubject.value.username;
  }

  public get currentUserTokenValue(): string {
    return this.currentUserSubject.value.token;
  }
}
