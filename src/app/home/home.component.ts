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
  public modules: Array<Folder> = [{id:1,folder_name:"http://schools-wikipedia.org/",banner:null,logo:"images/logos/wikipedia.png",parent_id:2},
  {id:1,folder_name:"/phet",banner:null,logo:"images/logos/phet.png",parent_id:2}
]
  public logos: Array<string> = ['images/logos/math.png',
  'images/logos/creative_arts.png',
  'images/logos/environment.png',
  'images/logos/health_safety.png',
  'images/logos/language_arts.png',
  'images/logos/local_topics.png',
  'images/logos/science.png',
  'images/logos/medical_encyclopedia.png',
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

