import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
import { ChatSignalRService } from '@app/service/chat-signal-r.service';

@Component({
  selector: 'app-social-net-board',
  templateUrl: './social-net-board.component.html',
  styleUrls: ['./social-net-board.component.scss']
})
export class SocialNetBoardComponent implements OnInit {

  constructor(
    private _chatSignalRService: ChatSignalRService,
    private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this._chatSignalRService.getMessage().subscribe(res=> console.log("Response: " + res))
  }
 
  public send(){
    this._chatSignalRService.sendToAll("dasdsadsadsadas");
  }


}
