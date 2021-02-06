import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageViewerBoardComponent } from './page/message-viewer-board/message-viewer-board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageViewerRoutingModule } from './message-viewer.routing';



@NgModule({
  declarations: [
    MessageViewerBoardComponent
  ],
  imports: [
    CommonModule,
    MessageViewerRoutingModule,
    SharedModule
  ]
})
export class MessageViewerModule { }
