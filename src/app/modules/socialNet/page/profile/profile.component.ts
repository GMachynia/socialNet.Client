import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { IFriendship, IUserProfile } from 'src/app/data/profile/schema/profile.schema';
import { ProfileService } from 'src/app/data/profile/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: IUserProfile;
  profileUsername: string;
  username: string;
  isFriend: boolean;

  constructor(
    private _profileService: ProfileService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.username = this._authService.currentUsernameValue;
    this.profileUsername = this._activatedRoute.snapshot.paramMap.get('username');
    this._profileService.isFriend(this.username, this.profileUsername).subscribe(res => this.isFriend = res, err => err)
    this._profileService.getUserProfile(this.profileUsername).subscribe(profile => this.userProfile = profile, err => err);
  }

  public onAddFriend(): void{
    const friendship: IFriendship = {
      friendUsername: this.profileUsername,
      username: this.username
    }
    this._profileService.addFriend(friendship).subscribe(res => res, err => err);
  }

}
