import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INewUser } from 'src/app/data/registration/schema/registration.schema';
import { RegistrationService } from 'src/app/data/registration/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
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
          username: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          city: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phoneNumber: ['', Validators.required],
          passwords: this._formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
          }, { validator: this.comparePasswords }),
          terms: this._formBuilder.group({
            acceptTerms: [false, Validators.requiredTrue]
          })
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
          phoneNumber: this.formModelControls.phoneNumber.value,
          password: this.formModelControls.passwords.get("password").value
        };
        this.submitted = true;
        // stop here if form is invalid
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
}
