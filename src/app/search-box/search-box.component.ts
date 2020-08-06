import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ActiveService } from '../services/active.service';
import { SearchData } from '../models/search-data';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() hideLink: boolean;
  searchString = '';
  constructor(public dataService: DataService,
              public router: Router,
              public activeData: ActiveService
    ) { }

  ngOnInit(): void {
  }
  
  search(){
    if (this.searchString.trim() != ''){
      this.router.navigate(['/search-list', this.searchString.toLocaleLowerCase()]);
    }
  }
}
