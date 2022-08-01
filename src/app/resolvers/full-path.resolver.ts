import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class FullPathResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): any {
    var id: string;
    var isFolder: boolean;

    if(route.params['folder_id']) {
        id = route.params['folder_id'];
        isFolder = true;
    }
    else {
        id = route.params['content_id'];
        isFolder = false;
    }

    return this.dataService.getFullPath(id, isFolder);
  }
}