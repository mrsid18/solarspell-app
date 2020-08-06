import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FolderData } from '../models/folder-data';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
   }

   getFolders(): Observable<any> {
     return this.http.get('http://localhost/backend/folders');
   }

   getFolderData(parentId): Observable<any> {
    let params = new HttpParams();
    params = params.append('folder_id', parentId);
    return this.http.get('http://localhost/backend/folder_get_children', {params});
  }

  getFileData(contentId): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', contentId);
    return this.http.get('http://localhost/backend/content_get_by_id', {params});
  }

  getMetadataList(): Observable<any> {
    return this.http.get('http://localhost/backend/metadata_list_by_type');
  }

  singleSearch(searchString): Observable<any> {
    let params = new HttpParams();
    params = params.append('search_string',searchString);
    return this.http.get('http://localhost/backend/content_single_search', {params});
  }
  advancedSearch(searchData: SearchData): Observable<any> {
    return this.http.post('http://localhost/backend/content_advanced_search',searchData);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FolderDataResolveService implements Resolve<FolderData> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FolderData> {
    return this.dataService.getFolderData(route.paramMap.get('folder_id'));
  }
}

@Injectable({
  providedIn: 'root',
})
export class FileDataResolveService implements Resolve<any> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FolderData> {
    return this.dataService
    .getFileData(route.paramMap.get('content_id'));
  }
}


@Injectable({
  providedIn: 'root',
})
export class SearchDataResolveService implements Resolve<any> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FolderData> {
    return this.dataService
    .singleSearch(route.paramMap.get('search_string'));
  }
}