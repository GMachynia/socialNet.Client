import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatSignalRService } from '@app/service/chat-signal-r.service';

@Component({
  selector: 'app-social-net-layout',
  templateUrl: './social-net-layout.component.html',
  styleUrls: ['./social-net-layout.component.scss']
})
export class SocialNetLayoutComponent implements OnInit, OnDestroy {

  constructor(private _chatSignalRService: ChatSignalRService) { }


  ngOnInit(): void {
    this._chatSignalRService.startConnection();
    this._chatSignalRService.receiveMessage();
  }

  ngOnDestroy(): void {
    this._chatSignalRService.stopConnection();
  }
}
