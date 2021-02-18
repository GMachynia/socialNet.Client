import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '@env/*';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalRService {

  public messageReceived = new EventEmitter<any>();
  public connectionEstablished = new EventEmitter<Boolean>();
  private _hubConnection: HubConnection;

  constructor() {
    this.startConnection();
    this.receiveMessage();
   }

  public sendToUser = (connectionId: string, message: string): void => {
    this._hubConnection.invoke('SendToUser', connectionId, message);
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

  private receiveMessage = (): void => {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

  private startConnection = () => {
    this._hubConnection = new HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/signalR/chat`)
                            .build();                      
    this._hubConnection
      .start()
      .then(() => console.log('SignalR Chat: Connection started'))
      .catch(err => console.log('SignalR Chat: Error while starting connection: ' + err))
  }

  public stopConnection(){
    this._hubConnection.stop();
  }

}
