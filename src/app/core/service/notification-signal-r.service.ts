import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '@env/*';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class NotificationSignalRService {

  public messageReceived = new EventEmitter<any>();
  public connectionEstablished = new EventEmitter<Boolean>();
  private _hubConnection: HubConnection;

  constructor() {
    this.startConnection();
   }

  private startConnection = () => {
    this._hubConnection = new HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/signalR/notification`)
                            .build();                      
    this._hubConnection
      .start()
      .then(() => console.log('SignalR Notification: Connection started'))
      .catch(err => console.log('SignalR Notification: Error while starting connection: ' + err))
  }

  public stopConnection(){
    this._hubConnection.stop();
  }

}
