import { Injectable } from '@angular/core';
import {SettingsService} from "./settings.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

declare var flvjs: any;

@Injectable()
export class LiveService {

  private headers;
  public flvjs = flvjs;

  constructor(private http: HttpClient,private settingsService:SettingsService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
      .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  }

  getRoomInfo(userName:string):Observable<any>{
    let url = this.settingsService.queryUrls.getRoomInfo;
    url = url.replace('{userName}',userName);
    return this.http.get(
      url,
      {headers:this.headers});
  }

  createRoom(params:any):Observable<any>{
    let url = this.settingsService.queryUrls.createRoom;
    return this.http.post(
      url,
      JSON.stringify(params),
      {headers:this.headers});
  }

  flv_load(element, url) {
    let i;
    let mediaDataSource = {
      type: 'flv',
      isLive: true,
      hasAudio: true,
      hasVideo: true
    };
    mediaDataSource['url'] = url;
    this.flv_load_mds(element, mediaDataSource);
  }

  flv_load_mds(element, mediaDataSource) {
    let player;
    if (typeof player !== "undefined") {
      if (player != null) {
        player.unload();
        player.detachMediaElement();
        player.destroy();
        player = null;
      }
    }
    player = flvjs.createPlayer(mediaDataSource, {
      enableWorker: false,
      lazyLoadMaxDuration: 3 * 60,
      seekType: 'range',
    });
    player.attachMediaElement(element);
    player.load();
  }

}
