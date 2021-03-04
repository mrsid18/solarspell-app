import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Folder } from '../models/folder';
import { ActiveService } from '../services/active.service';
import { Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

var math = Math;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  public folders: Array<Folder> = [];
  public modules: Array<Folder> = [
    //{id:1,folder_name:"/Wikipedia",banner:null,logo:"images/logos/wikipedia.png",parent_id:2},
    {id:1,folder_name:"http://schools-wikipedia.org/",banner:null,logo:"images/logos/wikipedia.png",parent_id:2},
    {id:1,folder_name:"/phet",banner:null,logo:"images/logos/phet.png",parent_id:2}
    //{id:1,folder_name:"https://oer2go.org/mods/en-kaos/science/health-and-medicine/index.html",banner:null,logo:"images/logos/khan01.png",parent_id:2},
    //{id:1,folder_name:"/en-hesperian_health",banner:null,logo:"images/logos/hesperian01.png",parent_id:2},
    //{id:1,folder_name:"/en-medline_plus",banner:null,logo:"images/logos/medical-encyclopedia01.png",parent_id:2},
    //{id:1,folder_name:"http://www.wiredhealthresources.net/",banner:null,logo:"images/logos/wiredhealth.png",parent_id:2},
    //{id:1,folder_name:"/global-health-media",banner:null,logo:"images/logos/globalhealthmedia.png",parent_id:2},
    //{id:1,folder_name:"/voa",banner:null,logo:"images/logos/voa.png",parent_id:2},
]
  public logos: Array<string> = ['images/logos/math.png',
  'images/logos/creative_arts.png',
  'images/logos/environment.png',
  'images/logos/health_safety.png',
  'images/logos/language_arts.png',
  'images/logos/local_topics.png',
  'images/logos/science.png',
  'images/logos/social_science.png',
  'images/logos/phet.png',
  'images/logos/kaLite.png',
  'images/logos/reference_tools.png',
  'images/logos/wikipedia.png',
] ;

//this variable holds Math
public  math = Math;

  constructor(private dataService: DataService,
              private activeService: ActiveService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.getFolders();
  }

  getFolders() {
    this.dataService.getFolders()
    .subscribe( response  => {
      this.folders = response;
      this.folders = this.folders.concat(this.modules);
    });
  }
}

