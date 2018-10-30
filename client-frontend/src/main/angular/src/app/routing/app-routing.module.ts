import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "../index/index.component";
import {SignComponent} from "../sign/sign.component";
import {LiveListComponent} from "../live-list/live-list.component";
import {CallbackComponent} from "../callback/callback.component";
import {AuthGuard} from "../service/auth.guard";
import {UserRoomComponent} from "../user-room/user-room.component";

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'login', component: SignComponent},
  {path: 'live-list', component: LiveListComponent},
  {path: 'user-room', component: UserRoomComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
