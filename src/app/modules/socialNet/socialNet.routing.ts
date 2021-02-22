import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './page/my-profile/my-profile.component';
import { ProfileComponent } from './page/profile/profile.component';
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
  },
  {
    path: 'profile',
    component: ProfileComponent 
  },
  {
    path: 'my-profile',
    component: MyProfileComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialNetRoutingModule { }