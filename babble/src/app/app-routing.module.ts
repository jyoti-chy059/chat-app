import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
    /*{
  path: '',
    redirectTo: '/chat/authentication',
    pathMatch: 'full'
}, {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule'
}, {
    path: '**',
    redirectTo: '/chat/authentication'
}*/
{
    path: '',
      redirectTo: '/chat/home',
      pathMatch: 'full'
  }, {
      path: 'chat',
      loadChildren: './chat/chat.module#ChatModule'
  }, {
    path: 'logout',
    component: LogoutComponent
  }, {
      path: '**',
      redirectTo: '/chat/authentication'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
