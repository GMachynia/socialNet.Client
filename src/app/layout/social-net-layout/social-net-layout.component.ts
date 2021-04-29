import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocialNetSignalRService } from '@app/service/social-net-signal-r.service';

@Component({
  selector: 'app-social-net-layout',
  templateUrl: './social-net-layout.component.html',
  styleUrls: ['./social-net-layout.component.scss']
})
export class SocialNetLayoutComponent implements OnInit, OnDestroy {

  constructor(private _signalRService: SocialNetSignalRService,
) { }


  ngOnInit(): void {
    this._signalRService.startConnection();
    this._signalRService.getNewPostNotification();
    this._signalRService.getNewCommentNotification();

  }

  ngOnDestroy(): void {
    this._signalRService.stopConnection();
  }
}
