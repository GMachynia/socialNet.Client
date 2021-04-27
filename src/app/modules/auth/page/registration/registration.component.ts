import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, switchMapTo } from 'rxjs/operators';
import { INewUser } from 'src/app/data/registration/schema/registration.schema';
import { RegistrationService } from 'src/app/data/registration/service/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  
  formModel: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
 
    constructor( 
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _registrationService: RegistrationService) { }

    ngOnInit(){
        this.formModel= this._formBuilder.group({
          username: ['', [Validators.required],  [this.usernameValidator()]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          city: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          passwords: this._formBuilder.group({
            password: ['', [Validators.required, Validators.pattern('^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$')]],
            confirmPassword: ['', Validators.required]
          }, { validator: this.comparePasswords })  
        });
      }
    
    get formModelControls() { return this.formModel.controls; }

    private comparePasswords(formBuilder: FormGroup) {
        let confirmPswrdCtrl = formBuilder.get('confirmPassword');
        if (confirmPswrdCtrl.errors == null || 'passwordMissMatch' in confirmPswrdCtrl.errors) {
        if (formBuilder.get('password').value != confirmPswrdCtrl.value)
            confirmPswrdCtrl.setErrors({ passwordMissMatch: true });
          else
            confirmPswrdCtrl.setErrors(null);
        }
    }

      public onSubmit() {
        const userRegistration: INewUser = {
          city: this.formModelControls.city.value,
          username: this.formModelControls.username.value,
          lastName: this.formModelControls.lastName.value,
          firstName: this.formModelControls.firstName.value,
          email: this.formModelControls.email.value,
          password: this.formModelControls.passwords.get("password").value
        };
        this.submitted = true;
        if (this.formModel.invalid) {
          return;
        }
          this.loading = true;
          this._registrationService.registration(userRegistration)
          .subscribe(
            res => {
              this._router.navigate(['/auth/login']);
            },
            err=> {
              this.error = err;
              this.loading = false;
            });
      }

      usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          return timer(500).pipe(
            switchMapTo(this._registrationService.checkUsernameAvailability(control.value)),
            map(res => {
              return res ? { usernameExists: res } : null;
            })
          )
        };
      }
}
