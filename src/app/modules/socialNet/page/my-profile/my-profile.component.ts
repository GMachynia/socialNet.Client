import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { FriendshipStatus, IInvitation, IMyProfile, IUpdateFriendshipStatus } from 'src/app/data/my-profile/schema/my-profile.schema';
import { MyProfileService } from 'src/app/data/my-profile/service/my-profile.service';
import { IFriendship} from 'src/app/data/profile/schema/profile.schema';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  myProfile: IMyProfile;
  getMyProfile$: Observable<IMyProfile>
  
  constructor(
    private _myProfileService: MyProfileService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getMyProfile$ = this._myProfileService.getMyProfile();
    this.getMyProfile$.subscribe(profile => this.myProfile = profile, err => err);
  }

  public updateFriendship(invitation: IInvitation, status: "approved" | "rejected" | "blocked"): void{
   const updateFriendshipStatus: IUpdateFriendshipStatus = {
     friendUsername: invitation.username,
     status: status === "approved" ? FriendshipStatus.Approved : status === "blocked" ? FriendshipStatus.Blocked : FriendshipStatus.Rejected
   }
   this._myProfileService.updateFriendshipStatus(updateFriendshipStatus).pipe(concatMap(res => this.getMyProfile$.pipe(tap(res => this.myProfile = res)))).subscribe(res => res, err => err);
  }

}
