import {Component, AfterViewInit, ElementRef, Renderer2, OnInit, AfterContentChecked} from '@angular/core';
import {EmitService} from "./service/emit.service";
import {Auth0Service} from "./service/auth0.service";

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentChecked{

  el: ElementRef;
  _hostElem;
  profile;
  gettingProfile = false;

  constructor(private renderer: Renderer2,el: ElementRef,private emitService: EmitService,
              public authService: Auth0Service) {
    this.el = el;
    this._hostElem = this.el.nativeElement;
  }

  getProfile(){
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.gettingProfile = true;
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.gettingProfile = false;
      });
    }
  }

  ngOnInit(): void {
    this.authService.handleAuthentication();
  }

  ngAfterContentChecked() {
    if(this.authService.isAuthenticated() && !this.profile && !this.gettingProfile){
      this.getProfile();
    }
  }

}
