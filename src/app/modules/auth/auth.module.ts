import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationComponent } from './page/registration/registration.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
