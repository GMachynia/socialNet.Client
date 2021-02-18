import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, IUserCredentials } from '@app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formModel: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthService
  ) {
     if (this._authenticationService.currentUserValue) {
      this._router.navigate(['/main/board']);
     }
  }

  public ngOnInit() {
    this.formModel = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public get formModelControls() { return this.formModel.controls; }

  public onSubmit() {
    this.submitted = true;

    if (this.formModel.invalid) {
      return;
    }

    this.loading = true;
    const credentials: IUserCredentials = {
      password: this.formModelControls.password.value,
      username: this.formModelControls.username.value
    }
    this._authenticationService.login(credentials)
      .subscribe(
        res => {
          this._router.navigate(['/main/board']);
        },
        err => {
          this.error = err;
          this.loading = false;
        });
  }

}
