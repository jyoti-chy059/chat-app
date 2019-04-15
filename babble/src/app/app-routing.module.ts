import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
    redirectTo: '/chat/authentication',
    pathMatch: 'full'
}, {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule'
}, {
    path: '**',
    redirectTo: '/chat/authentication'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
