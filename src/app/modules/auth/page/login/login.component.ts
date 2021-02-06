import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/data/auth/service/login.service';

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
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  public ngOnInit() {
    this.formModel = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formModelControls() { return this.formModel.controls; }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formModel.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formModelControls.username.value)
      .subscribe(
        data => {
              
        },
        error => {
          this.error = error;
          this.loading = false;
        });
        console.log(this.error);
  }

}
