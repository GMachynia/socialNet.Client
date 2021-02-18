import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { JWTInterceptor } from './interceptor/JWT.interceptor';
import { BasicInterceptor } from './interceptor/basic.interceptor';


@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}