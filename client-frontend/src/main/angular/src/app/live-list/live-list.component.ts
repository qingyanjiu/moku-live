import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {LiveService} from "../service/live.service";
import {SettingsService} from "../service/settings.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  snapshoturl;

  lives:any[];

  colMargin = 10;
  colWidth:number;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
              private liveService:LiveService,
              private settingsService:SettingsService,
              private router: Router) { }

  updateColWidth() {
    let hostElem = this.el.nativeElement;
    let liveDiv = hostElem.querySelector('.liveContent');
    this.colWidth = (liveDiv.offsetWidth - this.colMargin * 2 - 10) / 4;
  }

  ngOnInit() {

    this.updateColWidth();

    Observable.fromEvent(window, 'resize')
      .debounceTime(100)
      .subscribe((event) => {
        this.updateColWidth();
      });

    this.snapshoturl = this.settingsService.snapshoturl;

  }

}
