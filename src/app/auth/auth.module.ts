import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { UsersServices } from './services/users.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../core/services/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    provideHttpClient(),
    AuthService,
    UsersServices,
    AuthGuard,
  ]
})
export class AuthModule { }
