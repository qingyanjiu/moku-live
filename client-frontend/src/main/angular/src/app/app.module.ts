import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {en_US, NgZorroAntdModule, NZ_I18N, NZ_NOTIFICATION_CONFIG} from 'ng-zorro-antd';
import {AppComponent} from './app.component';
import {TitleBarComponent} from "./title-bar/title-bar.component";
import {SearchComponent} from './title-bar/search/search.component';
import {AvatarComponent} from './title-bar/avatar/avatar.component';
import {MenuComponent} from './title-bar/menu/menu.component';
import {AppRoutingModule} from "./routing/app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmitService} from "./service/emit.service";
import {SettingsService} from "./service/settings.service";
import {HighchartsChartComponent} from './shared/highcharts/highcharts-chart.component';
import {IndexComponent} from './index/index.component';
import {DelonAuthConfig, DelonAuthModule, SimpleInterceptor} from '@delon/auth';
import {SignComponent} from './sign/sign.component';
import {UserService} from "./service/user.service";
import {LiveListComponent} from './live-list/live-list.component';
import {LiveService} from "./service/live.service";
import { LiveRoomComponent } from './live-room/live-room.component';
import { UserRoomComponent } from './user-room/user-room.component';
import {Auth0Service} from "./service/auth0.service";
import { CallbackComponent } from './callback/callback.component';
import {AuthGuard} from "./service/auth.guard";
import {ClipboardModule} from "ngx-clipboard";

//config the auth filter
// export function delonAuthConfig(): DelonAuthConfig {
//   return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
//     login_url: '/login',
//     ignores: [/\/login/, /assets\//, /\/user\/add/],
//     token_send_key: 'Authorization'
//   });
// }

@NgModule({
  declarations: [
    AppComponent,
    HighchartsChartComponent,
    TitleBarComponent,
    SearchComponent,
    AvatarComponent,
    MenuComponent,
    IndexComponent,
    SignComponent,
    LiveListComponent,
    LiveRoomComponent,
    UserRoomComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    NgbModule.forRoot(),
    DelonAuthModule.forRoot(),
    AppRoutingModule,
    ClipboardModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    { provide: NZ_NOTIFICATION_CONFIG, useValue: {
        nzTop         : '66px',
        nzBottom      : '24px',
        nzPlacement   : 'topRight',
        nzDuration    : 3000,
        nzMaxStack    : 7,
        nzPauseOnHover: true,
        nzAnimate     : true}},
    UserService,
    LiveService,
    EmitService,
    SettingsService,
    // {provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
    // {provide: DelonAuthConfig, useFactory: delonAuthConfig},
    Auth0Service,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}




