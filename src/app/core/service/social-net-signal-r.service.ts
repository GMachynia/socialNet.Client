import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '@env/*';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/data/new-post/schema/new-post.schema';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocialNetSignalRService {

  private newPostNotification = new EventEmitter<IPost>();
  private newCommentNotification = new EventEmitter<any>();
  private connectionEstablished = new EventEmitter<Boolean>();
  private _hubConnection: HubConnection;

  constructor(private _authService: AuthService) {}

  public getNewPostNotification$(): Observable<IPost>{
    return this.newPostNotification.asObservable();
  }

  public getNewCommentNotification$(): Observable<any>{
    return this.newCommentNotification.asObservable();
  }

  public getNewPostNotification(): void{
    this._hubConnection.on('NewPostNotification', (data: any) => {
      const messageObject: IPost = JSON.parse(data);
      messageObject.comments = [];
      this.newPostNotification.emit(messageObject);
    });
  }

  public getNewCommentNotification(): void{
    this._hubConnection.on('NewCommentNotification', (data: any) => {
      this.newCommentNotification.emit(data);
    });
  }
                      
  public startConnection = () => {
    this._hubConnection = new HubConnectionBuilder()
          .withUrl(`${environment.apiUrl}/signalR/socialNetHub`, 
          {
          //headers: { "Content-Type": "application/json; charset=utf-8" },
          accessTokenFactory: ()=> this._authService.currentUserTokenValue
          }
          )
    .build();                          

    this._hubConnection
      .start()
      .then(() => {
        this.connectionEstablished.emit(true);
        console.log('SignalR: Connection started');
      })
      .catch(err => {
        console.log('SignalR: Error while starting connection: ' + err)
        console.log('SignalR: Retrying...');
        setTimeout(() =>  { this.startConnection(); }, 5000);
      })
  }

  public stopConnection(){
    this._hubConnection.stop()
    .then(() => console.log('SignalR: Connection stopped'))
    .catch(err => console.log('SignalR: Error while stoping connection: ' + err));
  }
}
