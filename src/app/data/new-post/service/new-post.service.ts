import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable } from 'rxjs';
import { INewPost, IPost } from '../schema/new-post.schema';


@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  constructor(
    private _httpClient: HttpClient) { }

  public addPostImage(formData: FormData): Observable<any> {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/Post/addPostImage`, formData);      
  }

  public addPostWithoutImage(newPost: INewPost): Observable<boolean> {
    return this._httpClient.post<boolean>(`${environment.apiUrl}/api/Post/addPostDescription`, newPost);      
  }

  public getPosts(page: number, pageSize: number): Observable<IPost[]> {
    return this._httpClient.get<IPost[]>(`${environment.apiUrl}/api/Post/getPosts?page=${page}&pageSize=${pageSize}`);      
  }

  
}
