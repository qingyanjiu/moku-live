import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Auth0Service} from "./auth0.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth0Service: Auth0Service, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth0Service.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
