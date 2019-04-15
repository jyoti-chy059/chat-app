import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { User } from '../../../interface/user';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { ChatService } from '../../../shared/chat.service';
import { Router } from '@angular/router';
import { MessagesResponse } from '../../../interface/messages-response';
import { Message } from '../../../interface/message';
import { SocketService } from '../../../shared/socket.service';
import { FormsService } from 'src/app/shared/forms.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    public messageLoading = true;
	private userId: string = null;
	public selectedUser: User = null;
	public messages: Message[] = [];
	public messageForm: FormGroup;
    @ViewChild('messageThread') private messageContainer: ElementRef;
    
  constructor(private dataService: DataService, 
              private chatService: ChatService, 
              private socketService: SocketService,
              private formService: FormsService,
              private router: Router) {
                this.messageForm = this.formService.createMessageForm();
               }

  ngOnInit() {
    this.userId = this.dataService.getUserId();
    this.dataService.selectedUser.subscribe( (selectedUser: User) => {
        if (selectedUser !== null) {
            this.selectedUser = selectedUser;
            this.getMessages(this.selectedUser.id);
        }
    });
    this.listenForNewMessages();
  }

  getMessages(toUserId: string) {
    this.messageLoading = true;
    this.chatService.getMessages({ userId: this.userId, toUserId: toUserId })
      .subscribe((response: MessagesResponse) => {
        this.messages = response.messages;
        this.messageLoading =  false;
    });
  }  

  sendMessage(event) {
    if (event.keyCode === 13) {
        const message = this.messageForm.controls['message'].value.trim();
        if (message === '' || message === undefined || message === null) {
            alert(`Message can't be empty.`);
        } else if (this.userId === '') {
            this.router.navigate(['/']);
        } else if (this.selectedUser.id === '') {
            alert(`Select a user to chat.`);
        } else {
            this.sendAndUpdateMessages({
                fromUserId: this.userId,
                message: message,
                toUserId: this.selectedUser.id,
            });
        }
    }
}

sendAndUpdateMessages(message: Message) {
  try {
      this.messageForm.disable();
      this.socketService.sendMessage(message);
      this.messages = [...this.messages, message];
      this.messageForm.reset();
      this.messageForm.enable();
      this.scrollMessageContainer();
  } catch (error) {
      console.warn(error);
      alert(`Can't send your message`);
  }
}

listenForNewMessages(): void {
  this.socketService.receiveMessages().subscribe((socketResponse: Message) => {
      if (this.selectedUser !== null && this.selectedUser.id === socketResponse.fromUserId) {
          this.messages = [...this.messages, socketResponse];
          this.scrollMessageContainer();
      }
  });
}

scrollMessageContainer(): void {
    if (this.messageContainer !== undefined) {
        try {
            setTimeout(() => {
                this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
            }, 100);
        } catch (error) {
            console.warn(error);
        }
    }
}

alignMessage(userId: string): boolean {
    return this.userId === userId ? false : true;
}


}
