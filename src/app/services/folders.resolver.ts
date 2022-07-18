import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root',
  })
export class FoldersResolver implements Resolve<any> {
    constructor(private dataService: DataService)  {}
    resolve(): Observable<any> {
        return this.dataService.getFolders();
    }
}