import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SearchData } from '../models/search-data';
import { Content } from '../models/content';

//*****************************************
//Comment about 10 dropdown limitation
//*****************************************

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
  dropyears: Array<Date> = [];

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
    //Get years to display in dropdown
    this.dataService.advancedSearch(this.searchData)
    .subscribe( response  => {
      this.dropyears = Array.from(new Set(response.map(content => content.published_date))).map(year => new Date(year as string)).sort((a,b) => a.getFullYear()-b.getFullYear());
    });
    
    this.route.data.subscribe((data) => {
      if(data.searchResult){
        this.contentList = data.searchResult.contentList;
        this.searchString = data.searchResult.searchString;
        this.expandAdvanced = false;
      }
      else {
        this.contentList = [];
        this.expandAdvanced = true;
        this.searchString = "";
      }
    });
    
    this.getMetadataList();

    //Subscribe to url parameters
    this.route.queryParams.subscribe(params => {
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

      //Set dropdown options if url parameter 'metadata; is defined
      if(params['metadata'] != undefined) {
        //Create variable to store raw metadata array
        var metadata;

        //Set store raw metadata from url parameters
        //Ensure metadata is stored in an array even if there is only a single metadata parameter
        if(Array.isArray(params['metadata'])) {
          metadata = params['metadata'];
        }
        else {
          metadata = [params['metadata']];
        }

        //Loop through metadata and store each element in the corresponding metaTracker (linked with a dropdown)
        for(let meta of metadata) {
          //First number of metadata corresponds with the dropdown it is associated with
          //Initialize metaTracker that corresponds with current metadata
          if(this.metaTracker[meta[0]] == undefined) {
            this.metaTracker[meta[0]] = [];
          }

          //Add metadata to corresponding metaTracker
          this.metaTracker[meta[0]].push(parseInt(meta.slice(1)));
        }
      }

      //Call searchAdvanced() if user is not doing a basic search
      if(this.searchString == '') {
        this.searchAdvanced(false);
      }
    });
  }

  getFileExtension(fileName:string) : string {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
    switch (ext){
      case 'mp4':
        return '/assets/static/mp4.png';
      case 'pdf':
        return '/assets/static/file.png';
      default:
        return '/assets/static/file.png';
    }
  }

  getMetadataList() {
    this.dataService.getMetadataList()
    .subscribe( response  => {
      this.metadataList = response;
    });
  }

  searchAdvanced(scroll: boolean) {
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

    //Push url parameters if current page is not a basic search. Otherwise, navigate to advanced search and push url parameters
    //(if statement prevents unnecessary reloading of the search-list component)
    if(this.searchString == '') {
      this.router.navigate([], {
        queryParams: paramData
      });
    }
    else {
      var shouldReuseRoute = this.router.routeReuseStrategy.shouldReuseRoute;

      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return true;
      };

      this.router.navigate(['/search-list'], {
        queryParams: paramData
      });

      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = shouldReuseRoute;
      }, 0);
    }

    this.dataService.advancedSearch(this.searchData)
    .subscribe( response  => {
      this.contentList = response;

      if(scroll) {
        setTimeout(this.scrollToTable, 0);
      }
    });
  }

  startsWithSearchFn(item, metadata) {
    return metadata.meta_name.toLowerCase().startsWith(item.toLowerCase());
  }

  scrollToTable() {
    let el = document.getElementById('contentList');
    el.scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
  }
}
