import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { UiSupportModule } from '../../support/ui-support/ui-support.module';
import { FormSupportModule } from '../../support/form-support/form-support.module';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    UiSupportModule,
    FormSupportModule
  ]
})
export class AuthenticationModule { }
