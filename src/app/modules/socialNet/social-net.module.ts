import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetBoardComponent } from './page/social-net-board/social-net-board.component';
import { SocialNetRoutingModule } from './socialNet.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SocialNetBoardComponent],
  imports: [
    CommonModule,
    SocialNetRoutingModule,
    SharedModule
  ]
})
export class SocialNetModule { }
