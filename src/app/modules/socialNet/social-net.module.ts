import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetBoardComponent } from './page/social-net-board/social-net-board.component';
import { SocialNetRoutingModule } from './socialNet.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './page/profile/profile.component';
import { MyProfileComponent } from './page/my-profile/my-profile.component';
import { PostComponent } from './page/social-net-board/post/post.component';



@NgModule({
  declarations: [SocialNetBoardComponent, ProfileComponent, MyProfileComponent, PostComponent],
  imports: [
    CommonModule,
    SocialNetRoutingModule,
    SharedModule
  ]
})
export class SocialNetModule { }
