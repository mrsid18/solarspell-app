import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public searchString: String = ""; // the search string/keyword passed through the router for search
  public metadataList = [];
  public selectedMeta = [];
  public searchData: SearchData;
  public expandAdvanced: boolean;
  public  math = Math;
  dropyears: Array<Date> = [];
  years = ["1-1-1970","1-1-1971","1-1-1972","1-1-1973","1-1-1974","1-1-1975","1-1-1976","1-1-1977","1-1-1978","1-1-1979",
  "1-1-1980","1-1-1981","1-1-1982","1-1-1983","1-1-1984","1-1-1985","1-1-1986","1-1-1987","1-1-1988","1-1-1989",
  "1-1-1990","1-1-1991","1-1-1992","1-1-1993","1-1-1994","1-1-1995","1-1-1996","1-1-1997","1-1-1998","1-1-1999",
  "1-1-2000","1-1-2001","1-1-2002","1-1-2003","1-1-2004","1-1-2005","1-1-2006","1-1-2007","1-1-2008","1-1-2009",
  "1-1-2010","1-1-2011","1-1-2012","1-1-2013","1-1-2014","1-1-2015","1-1-2016","1-1-2017","1-1-2018","1-1-2019", "1-1-2020",
]
  constructor(public route: ActivatedRoute,
    public dataService:DataService,
    public activeData: ActiveService,
    public tableElement: ElementRef) {
      this.searchData = new SearchData();
      this.searchData.metadata = [];
     }

  ngOnInit(): void {
    this.getYears();
    this.route.data
      .subscribe((data) => {
        if(data.searchResult){
          this.contentList = data.searchResult.contentList;
          this.searchString = data.searchResult.searchString;
          this.scrollToTable();
          this.expandAdvanced = false;
        }
        else {
          this.contentList = [];
          this.expandAdvanced = true;
        }
      });
    this.getMetadataList();
  }

  getYears(){
    let current = new Date().getFullYear();
    let min = 1970;
    for( let i:number = current; i>=min; i--){
      this.dropyears.push(new Date(i,0,1));
    }
  }

  getFileExtension(fileName:string) : string
  {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
    switch (ext){
      case 'mp4':
        return 'assets/images/static/mp4.png';
      case 'pdf':
        return 'assets/images/static/file.png';
      default:
        return 'assets/images/static/file.png';
    }
  }

  getMetadataList() {
    this.dataService.getMetadataList()
    .subscribe( response  => {
      this.metadataList = response;
    });
  }
  addMeta($event)
  {
    this.selectedMeta.push($event);
  }
  removeMeta($event)
  {
    const index = this.selectedMeta.indexOf($event.value, 0);
    this.selectedMeta.splice(index,1);
  }
  searchAdvanced()
  {
    let meta_ids = this.selectedMeta.map(metadata => metadata.id);
    this.searchData.metadata = meta_ids;
    this.dataService.advancedSearch(this.searchData)
    .subscribe( response  => {
      this.contentList = response;
      this.scrollToTable();
    });
  }
  scrollToTable(){
    let el = this.tableElement.nativeElement.ownerDocument.getElementById('contentElement');
    el.scrollIntoView()
  }
}
