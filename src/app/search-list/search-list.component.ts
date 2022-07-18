import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SearchData } from '../models/search-data';
import { Content } from '../models/content';
import { Subscription } from 'rxjs';

//***************************************************************************************************
// Currently the first digit of metadata is used to store which dropdown it corresponds with. Therefore,
// only 10 dropdowns are currently allowed. If more are required, the code must be modified.
//***************************************************************************************************

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})

export class SearchListComponent implements OnInit {
  public contentList :Array<Content> = [];
  public searchString: string = ""; // the search string/keyword passed through the router for search
  public metadataList = [];
  public searchData: SearchData;
  public expandAdvanced: boolean;
  public  math = Math;
  public metaTracker : Array<any> = [];
  public dropyears: Array<number> = [];
  public previousSearch: Subscription;
  public loading: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public dataService:DataService,
    public router: Router,
    public tableElement: ElementRef
  ) {
    this.searchData = new SearchData();
    this.searchData.metadata = [];
  }

  ngOnInit(): void {
    if(this.route.snapshot.data.searchResult){
      this.contentList = this.route.snapshot.data.searchResult.contentList;
      this.searchString = this.route.snapshot.data.searchResult.searchString;
      this.expandAdvanced = false;
    }
    else {
      this.expandAdvanced = true;
      this.searchString = "";
    }

    var minDate: Date = new Date(this.route.snapshot.data.dates.min);
    var maxDate: Date = new Date(this.route.snapshot.data.dates.max);

    var minYear = minDate.getFullYear() + 1;
    var maxYear = maxDate.getFullYear() + 2;

    for(var j = maxYear; j >= minYear; j--) {
      this.dropyears.push(j);
    }
    
    //Get metadataList from resolver
    this.metadataList = this.route.snapshot.data.metadataList;

    //Get parameters from url
    var params = this.route.snapshot.queryParams;

    //Set this.searchData to url parameters unless url parameter is undefined
    if(params['title'] != undefined) {
      this.searchData.title = params['title'];
    }
    else {
      this.searchData.title = '';
    }

    if(params['min_date'] != undefined) {
      this.searchData.min_date = params['min_date'];
    }
    else {
      this.searchData.min_date = '';
    }

    if(params['max_date'] != undefined) {
      this.searchData.max_date = params['max_date'];
    }
    else {
      this.searchData.max_date = '';
    }

    //Deselect all dropdown options and initialize their tracking variables to blank arrays
    for(var i = 0; i < this.metaTracker.length; i++) {
      this.metaTracker[i] = [];
    }

    //Set dropdown options if url parameter 'metadata' is defined
    if(params['metadata'] != undefined) {
      //Create variable to store raw metadata array
      var metadata;

      //Ensure metadata is stored in an array even if there is only a single metadata parameter
      if(Array.isArray(params['metadata'])) {
        metadata = params['metadata'];
      }
      else {
        metadata = [params['metadata']];
      }

      //Loop through metadata and store each element in the corresponding metaTracker (linked with a dropdown)
      for(let meta of metadata) {
        if(this.metaTracker[meta[0]] == undefined) {
          this.metaTracker[meta[0]] = [];
        }

        this.metaTracker[meta[0]].push(parseInt(meta.slice(1)));
      }
    }

    //Call searchAdvanced() if user is not doing a basic search
    if(this.searchString == '') {
      this.searchAdvanced(false);
    }
  }

  searchAdvanced(scroll: boolean) {
    this.loading = true;

    //paramMeta = metadata pushed to url
    //this.searchData.metadata = metadata used for advanced search
    var paramMeta = [];
    this.searchData.metadata = [];

    //Loop through metaTracker and add each element to paramMeta and searchData.metadata
    this.metaTracker.forEach((tracker, index) => {
      tracker.forEach(element => {
        //id of index is the first digit of each paramMeta element
        paramMeta.push('' + index +  element);
        this.searchData.metadata.push(element);
      });
    });
    
    //Interface used to store url parameters
    interface ParamData {
      title?: string;
      metadata?: any;
      min_date?: string;
      max_date?: string;
    }

    var paramData: ParamData = {};

    //Store url parameters in paramData if defined
    if(this.searchData.title != '') {
      paramData.title = this.searchData.title;
    }

    if(this.searchData.min_date != '') {
      paramData.min_date = this.searchData.min_date;
    }

    if(this.searchData.max_date != '') {
      paramData.max_date = this.searchData.max_date;
    }

    if(paramMeta.length != 0) {
      paramData.metadata = paramMeta;
    }

    //Push url parameters if current page is not a basic search. Otherwise, navigate to /search-list and push url parameters
    //(if statement prevents unnecessary reloading of the search-list component)
    if(this.searchString == '') {
      //Push url parameters
      this.router.navigate([], {
        queryParams: paramData,
        state: { scroll: scroll }
      });

      //Terminate previous search if not completed
      if(this.previousSearch != undefined && !this.previousSearch.closed) {
        this.previousSearch.unsubscribe();
      }

      //Perform advanced search
      this.previousSearch = this.dataService.advancedSearch(this.searchData)
      .subscribe( response  => {
        this.contentList = response;
        this.loading = false;

        if(scroll || history.state.scroll) {
          setTimeout(this.scrollToTable, 0);
        }
      });
    }
    else {
      //Navigate to /search-list and push url parameters
      this.router.navigate(['/search-list'], {
        queryParams: paramData,
        state: { scroll: scroll }
      });
    }
  }

  startsWithSearchFn(item, metadata) {
    return metadata.meta_name.toLowerCase().startsWith(item.toLowerCase());
  }

  scrollToTable() {
    let el = document.getElementById('contentList');
    el.scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
  }
}