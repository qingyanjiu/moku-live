import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  background:string;

  constructor(private el: ElementRef,private renderer: Renderer2) { }

  resizeContent(){
    const hostElem = this.el.nativeElement;
    let height = window.innerHeight > 600 ? window.innerHeight - 64 - 34 : 600;
    this.renderer.setStyle(hostElem.querySelector('.index'),'height',height + 'px');
  }

  ngOnInit() {
    let bgNo = Math.ceil(Math.random()*100) % 3;
    this.background = `url("assets/img/back${bgNo}.jpg")`;
    this.resizeContent();
    Observable.fromEvent(window, 'resize')
      .debounceTime(100)
      .subscribe((event) => {
        this.resizeContent();
      });
  }

}
