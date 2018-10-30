import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {SettingsService} from "./settings.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {

  private headers;


  constructor(private http: HttpClient,private settingsService:SettingsService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
  }

  login(params:any):Observable<any>{
    let url = this.settingsService.queryUrls.login;
    return this.http.post(
      url,
      {username:params.username,password:params.password},
      {headers:this.headers,observe: 'response'});
  }

  register(params:any):Observable<any>{
    let url = this.settingsService.queryUrls.register;
    return this.http.post(
      url,
      {username:params.username,password:params.password},
      {headers:this.headers});
  }
}
