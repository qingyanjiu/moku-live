import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {EmitService} from "./emit.service";
import {SettingsService} from "./settings.service";

(window as any).global = window;

@Injectable()
export class Auth0Service {

  auth0 = new auth0.WebAuth({
    clientID: 'zilO60n6x2nTd1QE361ZAlKKmoQ460mh',
    domain: 'mokulive.auth0.com',
    responseType: 'token id_token',
    audience: 'http://client-backend.mokulive.stream',
    redirectUri: this.settingService.queryUrls.callback,
    scope: 'openid profile'
  });

  userProfile;

  constructor(public router: Router,private emitService:EmitService,private settingService:SettingsService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    }
    else {
      const self = this;
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          self.userProfile = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
        }
        cb(err, profile);
      });
    }
  }
}
