import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private previousUrl: string;
  private currentUrl: string;

  constructor(router: Router) {
    //Save the previous url and cache the current url whenever the router changes the page
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }
}
