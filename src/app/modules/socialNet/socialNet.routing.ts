import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialNetBoardComponent } from './page/social-net-board/social-net-board.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/board',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'board',
        component: SocialNetBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialNetRoutingModule { }