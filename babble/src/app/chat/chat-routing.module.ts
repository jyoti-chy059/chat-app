import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../shared/guard.service';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  /*  {
        path: '',
        component: ChatComponent,
        children: [{
            path: '',
            redirectTo: 'authentication',
            pathMatch: 'full'
        }, {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }, {
            path: 'home',
            loadChildren: './home/home.module#HomeModule',
           // canActivate: [AuthGuard]
        },{
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule',
            canActivate: [AuthGuard]
        },
         {
            path: '**',
            redirectTo: 'home'
        }]   
    } */  

    {
        path: '',
        component: ChatComponent,
        children: [{
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        }, {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }, {
            path: 'home',
            loadChildren: './home/home.module#HomeModule',
           // canActivate: [AuthGuard]
        },{
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule',
            //canActivate: [AuthGuard]
        },
        
         {
            path: '**',
            redirectTo: 'home'
        }]   
    }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
