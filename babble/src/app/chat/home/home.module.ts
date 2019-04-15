import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChatListModule } from './chat-list/chat-list.module';
import { MessagesModule } from './messages/messages.module';
import { UiSupportModule } from '../../support/ui-support/ui-support.module';

@NgModule({
  declarations: [
      HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiSupportModule,
    ChatListModule,
    MessagesModule
  ]
})
export class HomeModule { }
