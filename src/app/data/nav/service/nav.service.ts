import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private _httpClient: HttpClient) { }

  public getUsernamesByString(usernameString: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`${environment.apiUrl}/api/User/getUsersByUsernameString?usernameString=${usernameString}`);      
 }
}
