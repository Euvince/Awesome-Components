import { Routes } from '@angular/router';

export const routes: Routes = [
  { path : 'auth', loadChildren : () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path : 'social-media', loadChildren : () => import('./social-media/social-media.module').then((m) => m.SocialMediaModule) },
  { path : '**', redirectTo : 'social-media' }
];
