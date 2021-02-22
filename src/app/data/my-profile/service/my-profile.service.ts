import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';
import { IUserProfile } from '../../profile/schema/profile.schema';
import { IMyProfile, IUpdateFriendshipStatus } from '../schema/my-profile.schema';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(
    private _httpClient: HttpClient) { }

  public getMyProfile(): Observable<IMyProfile> {
    return this._httpClient.get<IMyProfile>(`${environment.apiUrl}/api/User/getMyProfile`);      
  }  

  public updateFriendshipStatus(updateFriendshipStatus: IUpdateFriendshipStatus): Observable<boolean> {
    return this._httpClient.patch<boolean>(`${environment.apiUrl}/api/Friendship/updateFriendship`, updateFriendshipStatus);      
  }  
}
