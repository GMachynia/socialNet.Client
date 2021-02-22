import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';
import { IFriendship, IUserProfile } from '../schema/profile.schema';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _httpClient: HttpClient) { }

  public getUserProfile(username: string): Observable<IUserProfile> {
    return this._httpClient.get<IUserProfile>(`${environment.apiUrl}/api/User/getUserProfile?username=${username}`);      
  }  
  public addFriend(friendship: IFriendship): Observable<boolean> {
  return this._httpClient.post<boolean>(`${environment.apiUrl}/api/Friendship/addFriend`, friendship);      
  }
  public isFriend(username: string, friendUsername: string): Observable<boolean> {
  return this._httpClient.get<boolean>(`${environment.apiUrl}/api/Friendship/isFriend?username=${username}&friendUsername=${friendUsername}`);      
  }
 
}
