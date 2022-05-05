import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Folder } from '../models/folder';

var math = Math;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  public folders: Array<Folder> = [];
  public modules: Array<Folder> = [];
  public ebp: Folder;
 

//this variable holds Math
public  math = Math;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getFolders();
    this.getModules();
  }

  getFolders() {
    this.dataService.getFolders()
    .subscribe( response  => {
      let all_folders = response;
      this.ebp = all_folders.find( ({ folder_name }) => folder_name === 'Evidence-Based Practice' );
      this.folders = all_folders.filter(item => item.folder_name !== 'Evidence-Based Practice');
    });
  }

  getModules() {
    this.dataService.getModules()
    .subscribe( response  => {
      this.modules = response;
    });
  }

}

