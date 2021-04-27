import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserImage } from '../schema/nav.schema';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private _httpClient: HttpClient) { }

  public getUsernamesByString(usernameString: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`${environment.apiUrl}/api/User/getUsersByUsernameString?usernameString=${usernameString}`);      
 }

 public addUserImage(formData: FormData): Observable<boolean> {
  return this._httpClient.patch<boolean>(`${environment.apiUrl}/api/User/setUserProfileImage`, formData);      
}

public getUserImage(): Observable<IUserImage> {
  return this._httpClient.get<IUserImage>(`${environment.apiUrl}/api/User/getMyProfile`);      
}

}
