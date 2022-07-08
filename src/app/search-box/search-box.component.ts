import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ActiveService } from '../services/active.service';

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
      // remove fts special characters
      let searchString_cleaned = this.searchString.replace(".", " ")
      .replace("?", " ")
      .replace(",", " ")
      .replace("!", " ");
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }

      //This created an infinite loop error in search list
      //this.router.onSameUrlNavigation = 'reload';

      this.router.navigate(['/search-list', searchString_cleaned]);
    }
  }
}
