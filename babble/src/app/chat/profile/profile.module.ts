import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormSupportModule } from '../../support/form-support/form-support.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormSupportModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
