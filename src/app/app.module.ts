import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { MessageViewerLayoutComponent } from '@layout/message-viewer-layout/message-viewer-layout.component';
import { SocialNetLayoutComponent } from '@layout/social-net-layout/social-net-layout.component';
import { NavComponent } from '@layout/nav/nav.component';
import { AuthModule } from '@modules/auth/auth.module';
import { CoreModule } from '@app/core.module';
import { HttpLoaderFactory, SharedModule } from '@shared/shared.module';
import { SocialNetModule } from '@modules/socialNet/social-net.module';
import { MessageViewerModule } from '@modules/message-viewer/message-viewer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MessageViewerLayoutComponent,
    SocialNetLayoutComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    SocialNetModule,
    MessageViewerModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate : false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

