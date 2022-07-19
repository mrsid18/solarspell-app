import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
  animations: [
    trigger('load-bar', [
      state('reset', style({ width: '0%'})),
      state('loading', style({ width: '75%'})),
      state('loaded', style({ width: '100%'})),
      state('started', style({ width: '0%' })),
      transition('* => loading', [animate('60s 0s cubic-bezier(0,1.1,.3,.89)')]),
      transition('* => loaded', [animate('0.5s 0s ease')]),
    ]),
    trigger('load-background', [
      state('reset', style({ opacity: '0' })),
      state('started', style({ opacity: '0' })),
      state('loading', style({ opacity: '100'})),
      state('loaded', style({ opacity: '100'})),
    ])
  ]
})
export class LoadingIndicatorComponent implements OnInit {
  state = 'reset';
  forcedLoading = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      //if(!this.forcedLoading) {
        if(event instanceof NavigationStart){
          this.state = 'started';

          setTimeout(() => {
            if(this.state == 'started') {
              this.state = 'loading';
            }
          }, 200);
        }
        else if(event instanceof NavigationEnd && this.state == 'loading') {
          this.state = 'loaded';
          setTimeout(() => { this.state = 'reset' }, 500);
        }
        else if(event instanceof NavigationEnd) {
          this.state = 'reset';
        }
      //}
   })
  }
}
