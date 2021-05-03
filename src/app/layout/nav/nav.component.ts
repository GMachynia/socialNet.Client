import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { SocialNetSignalRService } from '@app/service/social-net-signal-r.service';
import { environment } from '@env/*';
import { UserImagePopUpComponent } from '@shared/component/user-image-pop-up/user-image-pop-up.component';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { INotification, MenuType, NotificationType } from 'src/app/data/nav/schema/nav.schema';
import { NavService } from 'src/app/data/nav/service/nav.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  formControl = new FormControl();
  usernames: string[] = [];
  @ViewChild('searchInput') searchInput: ElementRef;


  settingsState: boolean = false;
  messagesState: boolean = false;
  notificationsState: boolean = false;

  matDialogRef: MatDialogRef<UserImagePopUpComponent>;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  currentProfileImage: string;
  defaultProfileImage: string = "../../../assets/images/userIcon.png";

  notifications: INotification[] = [];
 

  constructor(
    private _navService: NavService,
    private _router: Router,
    private _authService: AuthService,
    public _matDialog: MatDialog,
    private _signalRService: SocialNetSignalRService
    ){}

  ngOnInit(): void {
     this._router.routeReuseStrategy.shouldReuseRoute = () => false;
     this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         this._router.navigated = false;
         window.scrollTo(0, 0);
      }
  });
 
    this._navService.getUserImage().subscribe(res => {
      this.currentProfileImage = res.profilePicture ? environment.apiUrl + "/" + res.profilePicture : "../../../../assets/images/userIcon.png";
    });

      this.formControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.destroyed$),
      switchMap(usernameString => usernameString ? this._navService.getUsernamesByString(usernameString): of([])))
      .subscribe(res => this.usernames = res);

      this._signalRService.getNewPostNotification$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        const newPostNotification: INotification = {
          notificationType: this.notificationType.Post,
          postId: res.postId,
          username: res.username
        }
        this.notifications.unshift(newPostNotification);
      });
      this._signalRService.getNewCommentNotification$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        const newCommentNotification: INotification = {
          notificationType: this.notificationType.Comment,
          postId: res.postId,
          username: res.commentOwner
        }
        this.notifications.unshift(newCommentNotification);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  
  public get menuType(): typeof MenuType {
    return MenuType; 
  }

  public get notificationType(): typeof NotificationType {
    return NotificationType; 
  }

  public onUsernameSelected(event: MatAutocompleteSelectedEvent): void{
    this._router.navigate(['/main/profile', { username: event.option.value }]);
    this.formControl.setValue('');
  }

  public onMyProfile(): void{
    this._router.navigate(['/main/my-profile']);
  }

  public onLogout(){
    this._authService.logout();
   }

  public handleMenu(menuType: MenuType): void{
    switch(menuType){
      case MenuType.Messages:{
        this.messagesState = !this.messagesState;
        this.notificationsState = false;
        this.settingsState = false;
        break;
      }
      case MenuType.Notifications:{
        this.notificationsState = !this.notificationsState;
        this.messagesState  = false;
        this.settingsState = false;
        break;
      }
      case MenuType.Settings:{
        this.settingsState= !this.settingsState;
        this.notificationsState = false;
        this.messagesState = false;
        break;
      }
    }
  }
 
  public focusInput(){
      this.searchInput.nativeElement.focus();
  }

  public setUpImage(){
    this.matDialogRef = this._matDialog.open(UserImagePopUpComponent, {
      data: { profileImage: this.currentProfileImage },
      disableClose: true
    });
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
       this.currentProfileImage = res.profileImageChanged;
      }
    });
  }
  }

