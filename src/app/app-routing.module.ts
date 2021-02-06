import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { AuthGuard } from '@app/guard/auth.guard';
import { SocialNetLayoutComponent } from '@layout/social-net-layout/social-net-layout.component';
import { MessageViewerLayoutComponent } from '@layout/message-viewer-layout/message-viewer-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: SocialNetLayoutComponent,
    canActivate: [AuthGuard], 
        loadChildren: () =>
          import('@modules/socialNet/social-net.module').then(m => m.SocialNetModule)
  },
  {
    path: 'message-viewer',
    component: MessageViewerLayoutComponent,
    canActivate: [AuthGuard], 
        loadChildren: () =>
          import('@modules/message-viewer/message-viewer.module').then(m => m.MessageViewerModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}