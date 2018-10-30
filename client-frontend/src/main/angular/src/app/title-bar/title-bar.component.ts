import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Auth0Service} from "../service/auth0.service";

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() profile;

  constructor(public authService:Auth0Service) { }

  ngOnInit() {
  }



}
