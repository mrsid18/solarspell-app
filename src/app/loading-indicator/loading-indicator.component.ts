import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';

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
  //Initially the component state is 'reset'
  state = 'reset';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Call startLoad() when router starts loading and endLoad() when it ends loading
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this.startLoad();
      }
      else if(event instanceof NavigationEnd) {
        this.endLoad();
      }
    })
  }

  startLoad(): void {
    //Set the current state to started
    this.state = 'started';

    //In 200 ms, if the state is still started, set the state to loading
    setTimeout(() => {
      if(this.state == 'started') {
        this.state = 'loading';
      }
    }, 200);
  }

  endLoad(): void {
    //If the state is 'loading' play animation and reset the state
    if(this.state == 'loading') {
      this.state = 'loaded';
      setTimeout(() => { this.state = 'reset' }, 500);
    }
    else { //Otherwise, (if the state is 'started' and hasn't changed to 'loading' yet) reset the state
      this.state = 'reset';
    }
  }
}
