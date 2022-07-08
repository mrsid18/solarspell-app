import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SearchData } from '../models/search-data';
import { Content } from '../models/content';
import { ActiveService } from '../services/active.service';

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
  years = ["1-1-1970","1-1-1971","1-1-1972","1-1-1973","1-1-1974","1-1-1975","1-1-1976","1-1-1977","1-1-1978","1-1-1979",
    "1-1-1980","1-1-1981","1-1-1982","1-1-1983","1-1-1984","1-1-1985","1-1-1986","1-1-1987","1-1-1988","1-1-1989",
    "1-1-1990","1-1-1991","1-1-1992","1-1-1993","1-1-1994","1-1-1995","1-1-1996","1-1-1997","1-1-1998","1-1-1999",
    "1-1-2000","1-1-2001","1-1-2002","1-1-2003","1-1-2004","1-1-2005","1-1-2006","1-1-2007","1-1-2008","1-1-2009",
    "1-1-2010","1-1-2011","1-1-2012","1-1-2013","1-1-2014","1-1-2015","1-1-2016","1-1-2017","1-1-2018","1-1-2019", "1-1-2020",
  ]

  constructor(
    public route: ActivatedRoute,
    public dataService:DataService,
    public activeData: ActiveService,
    public router: Router,
    public tableElement: ElementRef
    ) {
      this.searchData = new SearchData();
      this.searchData.metadata = [];
    }

  ngOnInit(): void {
    this.getYears();
    this.route.data.subscribe((data) => {
      if(data.searchResult){
        this.contentList = data.searchResult.contentList;
        this.searchString = data.searchResult.searchString;
        this.scrollToTable();
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

          //If statement technically not necessary. Could be used to increase stability? Prevents duplicate metadata, which breaks search
          //if(!this.metaTracker[meta[0]].includes(parseInt(meta.slice(1)))) {
            //Add metadata to corresponding metaTracker
            this.metaTracker[meta[0]].push(parseInt(meta.slice(1)));
          //}
        }
      }

      //Call searchAdvanced() if user is not doing a basic search
      if(this.searchString == '') {
        this.searchAdvanced();
      }
    });
  }

  getYears() {
    let current = new Date().getFullYear();
    let min = 1970;
    for( let i:number = current; i>=min; i--){
      this.dropyears.push(new Date(i,0,1));
    }
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

  searchAdvanced() {
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
      this.router.navigate(['/search-list'], {
        queryParams: paramData
      });
    }

    this.dataService.advancedSearch(this.searchData)
    .subscribe( response  => {
      this.contentList = response;
      this.scrollToTable();
    });
  }

  startsWithSearchFn(item, metadata) {
    return metadata.meta_name.toLowerCase().startsWith(item.toLowerCase());
  }

  scrollToTable() {
    let el = this.tableElement.nativeElement.ownerDocument.getElementById('contentElement');
    el.scrollIntoView()
  }
}
