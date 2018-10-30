import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class SettingsService {

  public snapshoturl = 'http://mokulive.stream/record/';
  public rtmpLiveUrl = 'rtmp://go.mokulive.stream/live/';
  public httpflvLiveUrl = 'http://edge.mokulive.stream/live?app=live&stream=';
  public hlsLiveUrl = 'http://mokulive.stream/hls/';

  public queryUrls:any;
  private prodClientBackendUrl = 'http://client-backend.mokulive.stream';
  private devClientBackendUrl = 'http://client-backend.mokulive.stream';

  private prodClientFrontendUrl = 'http://go.mokulive.stream';
  private devClientFrontendUrl = 'http://localhost:5000';

  constructor() {


    if (environment.production) {
      this.queryUrls = {
        callback: `${this.prodClientFrontendUrl}/callback`,

        createRoom: `${this.prodClientBackendUrl}/live/openRoom`,
        getRoomInfo: `${this.prodClientBackendUrl}/live/getRoom?userName={userName}`,
      }
    }
    else {
      this.queryUrls = {
        callback: `${this.devClientFrontendUrl}/callback`,

        createRoom: `${this.devClientBackendUrl}/live/openRoom`,
        getRoomInfo: `${this.devClientBackendUrl}/live/getRoom?userName={userName}`,
      }
    }
  }
}
