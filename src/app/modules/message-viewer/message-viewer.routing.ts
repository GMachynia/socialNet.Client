import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageViewerBoardComponent } from './page/message-viewer-board/message-viewer-board.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/message-viewer/board',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'board',
        component: MessageViewerBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageViewerRoutingModule { }