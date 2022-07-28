import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  //Configurable: Change this to be the path where the modules are located at. If on root directory, should be equal to '/'
  modulePath = environment.moduleUrl;

  constructor(
    private location: Location,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    //Get id parameter from url; id should be the name the module (/module/:id/**)
    var id = this.route.snapshot.paramMap.get('id');

    //Get full path
    var path = this.location.path();

    //Remove "/module/" from path
    path = path.slice(('/module/').length, path.length);

    if(path == id) {
      path += '/';
    }

    //Add path to host url
    this.address = this.sanitizer.bypassSecurityTrustResourceUrl(this.modulePath + path);

    //Hide content below iframe to remove extra scrollbar
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    const navbarSize = 66;

    //Set iframe height based on window height - size of navbar (delayed to prevent occasional issue with address bar resizing hiding module content)
    setTimeout(()=> {
      this.iframeHeight = window.innerHeight - navbarSize;
    }, 100);
    
    //Update iframe height when window is resized or window orientation changes
    window.addEventListener('resize', () => {
      this.iframeHeight = window.innerHeight - navbarSize;
    });

    window.addEventListener('orientationchange', () => {
      this.iframeHeight = window.innerHeight - navbarSize;
    });
  }

  ngOnDestroy(): void {
    //Reset style that is modified when user leaves the page
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
  }

  //Called when iframe page changes
  pageChange(): void {
    if(this.iframe != null) {
      //Get path from iframe
      var path = this.iframe.nativeElement.contentWindow.location.pathname;

      //Remove modulePath from path
      path = path.slice(this.modulePath.length, path.length);

      //Normalize path to remove '/' from end
      path = this.location.normalize(path);

      //Set browser path
      this.location.replaceState('module/' + path);

      //Update url before iframe is fully loaded
      this.iframe.nativeElement.contentWindow.addEventListener('unload', (event) => {
        //Run asynchronously to wait until iframe url is changed
        setTimeout(()=>{
          //Do not execute pageChange() if the user navigates outside of module component
          if(this.iframe.nativeElement.contentWindow) {
            this.pageChange();
          }
        }, 0);
      });
    }
  }

  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;
  address: SafeResourceUrl;
  names: string[];
  iframeHeight: number;
}
