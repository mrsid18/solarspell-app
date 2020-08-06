import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Breadcrumb } from './breadcrumb.component';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class BreadcrumbService {
    breadcrumbArray: Array<Breadcrumb> = [];
    private breadcrumbList = new BehaviorSubject<Breadcrumb[]>(null);
    constructor(private http: HttpClient) {
    }

    updateBreadcrumb(id, isFolder) {
        this.breadcrumbArray = [];
        this.getFullPath(id, isFolder)
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

    getFullPath(id, isFolder) {
        let params = new HttpParams();
        params = params.append('id', id);
        params = params.append('isFolder', isFolder ? '1' : '0');
        return this.http.get('http://localhost/backend/get_full_path', {params});
    }

    getBreadcrumbList() {
        return this.breadcrumbList.asObservable();
    }
}
