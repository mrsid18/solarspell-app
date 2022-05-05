import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Breadcrumb } from './breadcrumb.component';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';
@Injectable({
    providedIn: 'root'
  })
export class BreadcrumbService {
    breadcrumbArray: Array<Breadcrumb> = [];
    private breadcrumbList = new BehaviorSubject<Breadcrumb[]>(null);
    constructor(private http: HttpClient, private dataService:DataService) {
    }

    updateBreadcrumb(id, isFolder) {
        this.breadcrumbArray = [];
        this.dataService.getFullPath(id, isFolder)
        .subscribe( response  => {
            this.retrievePath(response);
          });
    }

    retrievePath(nestedObject: any) {
        this.breadcrumbArray.push({id: nestedObject.id, name: nestedObject.name});
        this.breadcrumbList.next(this.breadcrumbArray);
        if (nestedObject.childPath == null) {
            return;
        } else {
            this.retrievePath(nestedObject.childPath);
        }
    }
    
    getBreadcrumbList() {
        return this.breadcrumbList.asObservable();
    }
}
