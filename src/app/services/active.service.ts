import { Injectable } from '@angular/core';
import { SearchData } from '../models/search-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  private searchDataSource = new BehaviorSubject<SearchData>(null);
  private searchStringSource = new BehaviorSubject<string>("");
  private isAdvancedDataSource = new BehaviorSubject<boolean>(false);
  searchData = this.searchDataSource.asObservable();
  searchString = this.searchStringSource.asObservable();
  isAdvanced = this.isAdvancedDataSource.asObservable();

  constructor() { }
  
  changeSearchDataSource(searchData: SearchData) {
    this.searchDataSource.next(searchData);
  }
  changeSearchStringSource(searchString: string) {
    this.searchStringSource.next(searchString);
  }
  changeisAdvancedSource(isAdvanced: boolean) {
    this.isAdvancedDataSource.next(isAdvanced);
  }
}
