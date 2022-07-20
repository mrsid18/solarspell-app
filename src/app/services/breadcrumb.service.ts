import { Injectable } from '@angular/core';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BreadcrumbService {
    breadcrumbArray: Array<Breadcrumb> = [];
    private breadcrumbList = new BehaviorSubject<Breadcrumb[]>(null);
    constructor() {
    }

    updateBreadcrumb(response) {
        this.breadcrumbArray = [];
        this.retrievePath(response);
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
