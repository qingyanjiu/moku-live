import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {EmitService} from "../../service/emit.service";
import {Auth0Service} from "../../service/auth0.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent implements OnInit,OnChanges {

  bgColor:string = '';
  fontColor:string = '';

  shortName:string = '';
  icon = 'anticon anticon-user';

  @Input() profile;

  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
              private emitService:EmitService,
              private authService:Auth0Service,
              private modalService: NzModalService) { }

  ngOnInit() {

    // //observe loginSuccess event
    // this.emitService.eventEmit.subscribe((value: any) => {
    //   if(this.authService.isAuthenticated()) {
    //     let userName = this.tokenService.get().username;
    //     this.updateAvatar(userName);
    //   }
    // });
    //
    // //if username and token in localstorage, update avatar
    // let userName = this.tokenService.get().username;
    // if(userName){
    //   this.updateAvatar(userName);
    // } else {
    //   this.bgColor = '#888';
    //   this.fontColor = '#FFF';
    // }
  }

  ngOnChanges(){
    if(this.profile && this.profile.nickname)
      this.updateAvatar(this.profile.nickname);
  }

  getRandomColor(){
    var color = ColorList[Math.ceil(Math.random()*10) % 4];
    // while(color === '347db0')
    //   color = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
    return color;
  }

  log(text){
    console.log(text);
  }

  updateAvatar(userName){
    if(userName && userName.length>2)
      this.shortName = userName.substring(0,2).toUpperCase();
    else
      this.shortName = userName;
    this.icon = '';
    this.bgColor = this.getRandomColor();
  }

  logOut(){
    this.modalService.confirm({
      nzTitle: 'Log Out',
      nzContent: '<b style="color: #888888;">Are you sure to log out?</b>',
      nzOkText: 'Yes',
      nzOkType: 'warning',
      nzOnOk: () => {
        this.authService.logout();
        this.shortName = '';
        this.bgColor = '';
        this.icon = 'anticon anticon-user';
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel logout')
    });
  }

}
