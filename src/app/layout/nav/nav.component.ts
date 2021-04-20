import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { settings } from 'cluster';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NavService } from 'src/app/data/nav/service/nav.service';

 enum MenuType{
 Settings,
 Messages,
 Notifications
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  formControl = new FormControl();
  usernames: string[];
  @ViewChild('searchInput') searchInput: ElementRef;

  settingsState: boolean = false;
  messagesState: boolean = false;
  notificationsState: boolean = false;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _navService: NavService,
    private _router: Router,
    private _authService: AuthService
    ){}

  ngOnInit(): void {
     this._router.routeReuseStrategy.shouldReuseRoute = () => false;
     this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         this._router.navigated = false;
         window.scrollTo(0, 0);
      }
  });
  
      this.formControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.destroyed$),
      switchMap(usernameString => usernameString ? this._navService.getUsernamesByString(usernameString): of([])))
      .subscribe(res => this.usernames = res);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  
  public get menuType(): typeof MenuType {
    return MenuType; 
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

}
