import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';
import { INewUser } from '../schema/registration.schema';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _httpClient: HttpClient) { }

  public registration(userRegistration: INewUser) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/User/register`, userRegistration);      
 }

 public checkUsernameAvailability(username: string){
  return this._httpClient.get<any>(`${environment.apiUrl}/api/User/checkUsername?username=${username}`); 
 }

}
