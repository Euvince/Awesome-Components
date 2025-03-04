import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { httpProviderInterceptors } from './interceptors';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    provideHttpClient(),
    AuthService,
    // httpProviderInterceptors
  ]
})
export class CoreModule { }
