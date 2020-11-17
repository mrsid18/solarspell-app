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

//test logo array
public folder_test: Array<string> = ['images/logos/math.png',
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

//test module array 
public modules: Array<string> = ['images/modules/science.png',
  'images/modules/language_arts.png',
  'images/modules/local_topics.png',
  'images/modules/creative_arts.png',
  'images/modules/environment.png',
  'images/modules/health_safety.png',
] ;

//this variable will hold the folder_test and module array
public contents: Array<string> = [];

//this variable holds Math
public  math = Math;

  constructor(private dataService: DataService,
              private activeService: ActiveService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.getFolders();
    //this code combines folder_test and modules
    this.contents= this.folder_test.concat(this.modules);
  }

  getFolders() {
    this.dataService.getFolders()
    .subscribe( response  => {
      this.folders = response;
    });
  }
}

