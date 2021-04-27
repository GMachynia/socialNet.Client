import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '@env/*';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalRService {

  private messageReceived = new EventEmitter<any>();
  private messageReceivedFromUser = new EventEmitter<any>();
  private _hubConnection: HubConnection;

  constructor(private _authService: AuthService) {

   }
  
  public getMessage(): Observable<any>{
    return this.messageReceived.asObservable();
  }

  public getMessageFromTo(connectionIdFrom: string, connectionIdTo: string): Observable<any>{
    return this.messageReceivedFromUser.asObservable();
  }

  public sendToUser = (connectionId: string, message: string): void => {
    this._hubConnection.invoke('SendToUser', connectionId, message);
  }

  private responseFromUser = (): void => {
    this._hubConnection.on('ReceiveMessageFromUser', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  public sendToAll = (message: string): void => {
    this._hubConnection.invoke('SendToAll', message);
  }

  public createGroup = (groupName: string): void => {
    this._hubConnection.invoke('Join', groupName);
  }

  public addUserToGroup = (userConnectionId: string, groupName: string): void =>{
    this._hubConnection.invoke('AddToGroup', userConnectionId, groupName);
  }

  public sendMessageToGroup = (groupName: string): void => {
    this._hubConnection.invoke('SendToGroup', groupName);
  }

  public receiveMessage = (): void => {
    this._hubConnection.on('ReceiveMessageToAll', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  public startConnection = () => {
    this._hubConnection = new HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/signalR/chat`, 
                            {
                              //headers: { "Content-Type": "application/json; charset=utf-8" },
                              accessTokenFactory: ()=> this._authService.currentUserTokenValue
                            }
                            )
                            .build();   

    this._hubConnection
      .start()
      .then(() => console.log('SignalR Chat: Connection started'))
      .catch(err => console.log('SignalR Chat: Error while starting connection: ' + err))
  }

  public stopConnection(){
    this._hubConnection.stop()
    .then(() => console.log('SignalR Chat: Connection stopped'))
    .catch(err => console.log('SignalR Chat: Error while stoping connection: ' + err))
  }

}
