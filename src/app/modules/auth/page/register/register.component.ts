import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INewUser } from 'src/app/data/auth/schema/auth.schema';
import { RegistrationService } from 'src/app/data/auth/service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  formModel: FormGroup;
  
  
    constructor( private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private registrationService: RegistrationService) { }

      comparePasswords(formBuilder: FormGroup) {
        let confirmPswrdCtrl = formBuilder.get('confirmPassword');
        if (confirmPswrdCtrl.errors == null || 'passwordMissMatch' in confirmPswrdCtrl.errors) {
          if (formBuilder.get('password').value != confirmPswrdCtrl.value)
            confirmPswrdCtrl.setErrors({ passwordMissMatch: true });
          else
            confirmPswrdCtrl.setErrors(null);
        }
      }

  ngOnInit(){
    this.formModel= this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords }),
      terms: this.formBuilder.group({
        acceptTerms: [false, Validators.requiredTrue]
      })
    });
  }

  get formModelControls() { return this.formModel.controls; }
 
  
  onSubmit() {
    let userRegistration: INewUser = {
       username: this.formModelControls.username.value,
       lastName: this.formModelControls.lastName.value,
       firstName: this.formModelControls.firstName.value,
       email: this.formModelControls.email.value,
       phoneNumber: this.formModelControls.phoneNumber.value,
       password: this.formModelControls.passwords.get("password").value
    };

    console.log(userRegistration)
    this.submitted = true;

    // stop here if form is invalid
    if (this.formModel.invalid) {
      return;
    }

    this.loading = true;
    this.registrationService.registration(userRegistration)
      .subscribe(
        data => {

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
