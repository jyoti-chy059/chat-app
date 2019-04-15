import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { FormSupportModule } from '../../../support/form-support/form-support.module';


@NgModule({
  declarations: [
      MessagesComponent
  ],
  imports: [
    CommonModule,
    FormSupportModule
  ],
  exports: [
    MessagesComponent
  ]
})
export class MessagesModule { }
