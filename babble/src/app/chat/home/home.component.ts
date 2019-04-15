import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Router } from '../../../../node_modules/@angular/router';
import { ChatService } from '../../shared/chat.service';
import { SocketService } from '../../shared/socket.service';
import { Auth } from '../../interface/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userId: string = null;
	public username: string = null;
	public overlayDisplay = true;

  constructor(private dataService: DataService, 
              private chatService: ChatService,
              private socketService: SocketService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.dataService.getUserId();
    this.username = this.dataService.getUserName();
    this.establishSocketConnection();
  }

  async establishSocketConnection() {
    try {
        if (this.userId === '' || typeof this.userId === 'undefined' || this.userId === null) {
            this.router.navigate(['/']);
        } else {
            /* making socket connection by passing UserId. */
            await this.socketService.connectSocket(this.userId);
            this.overlayDisplay = false;
        }
    } catch (error) {
        alert('Something went wrong');
    }
}

logout() {
    this.chatService.removeLS()
        .then((removedLs: boolean) => {
            this.socketService.logout({ userId: this.userId }).subscribe((response: Auth) => {
                this.router.navigate(['/']);
            });
        })
        .catch((error: Error) => {
            alert(' This App is Broken, we are working on it. try after some time.');
            throw error;
        });
}

activeProfile(){
    this.router.navigate(['/chat/profile']);
}

}
