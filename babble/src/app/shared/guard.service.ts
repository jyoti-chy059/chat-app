import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private chatService: ChatService) { }

  canActivate(): Observable<boolean>{
    return this.chatService.userSessionCheck();
  }
}
