import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Folder } from '../models/folder';
import { ActiveService } from '../services/active.service';
import { Router } from '@angular/router';

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
  'images/logos/medical_encyclopedia.png',
  'images/logos/wikipedia.png',
] ;
public length = 9;

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
    });
  }
}
