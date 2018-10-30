import {Component, ElementRef, OnChanges, OnInit} from '@angular/core';
import {LiveService} from "../service/live.service";
import {Auth0Service} from "../service/auth0.service";
import {SettingsService} from "../service/settings.service";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.css']
})
export class UserRoomComponent implements OnInit {

  roomName: string;
  roomPass: string;
  withPass = false;

  roomExists = false;

  roomInfo: any;

  poster = 'assets/img/player-back-empty.jpg';
  profile: any;

  loading = false;

  constructor(private liveService: LiveService,
              private auth0Service: Auth0Service,
              private settingsService: SettingsService,
              private el: ElementRef,
              private notification: NzNotificationService) {
  }

  startPlay(){
    if (this.liveService.flvjs.isSupported()) {
      var live = this.el.nativeElement.querySelector('#videoElement');
      this.liveService.flv_load(live, `${this.settingsService.httpflvLiveUrl}${this.roomInfo.streamCode}`);
    }
  }

  createRoom() {
    if(!this.roomName){
      this.notification.create('warning', 'Warning',
        `Please input your room name`);
    }
    else {
      this.loading = true;
      let params = {};
      params['roomName'] = this.roomName;
      params['roomPass'] = this.roomPass;
      params['userName'] = this.profile.name;
      this.liveService.createRoom(params)
        .subscribe(data => {
          if (data.result && data.result !== 'error') {
            this.roomInfo = data.result;
            this.roomExists = true;
            this.loading = false;
            this.poster = 'assets/img/player-back.jpg';
            this.startPlay();
          }
        });
    }
  }

  copySuccess(type) {
    this.notification.create('success', 'Copied',
      `${type} copied successfully`);
  }


  ngOnInit() {
    this.loading = true;
    this.profile = JSON.parse(localStorage.getItem('profile'));

    this.liveService.getRoomInfo(this.profile.name)
      .subscribe(data => {
        if (data.result && data.result !== 'error') {
          this.roomInfo = data.result;
          this.roomExists = true;
          this.loading = false;
          this.poster = 'assets/img/player-back.jpg';
          this.startPlay();
        }
        else {
          this.loading = false;

        }
      });

  }

}
