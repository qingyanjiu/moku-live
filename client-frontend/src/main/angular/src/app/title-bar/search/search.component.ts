import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  _value = '';
  _type:string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this._type = 'Web Order Id';
  }

  //this can refresh page every time when route to the same page
  //if the search param not change, it will no reload page
  onSearch(event: any): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    this.router.navigate(['order-info'], {queryParams : event, skipLocationChange: true });
  }

  //this can refresh page every time when route to the same page
  forceReloadPage(event: any): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    let currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate(['order-info'],{queryParams : event, skipLocationChange: true });
      });
  }

}
