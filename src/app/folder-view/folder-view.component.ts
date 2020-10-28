import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Folder } from '../models/folder';
import { FolderData } from '../models/folder-data';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {

  public parentFolder: Folder;
  public contentList: Array<Content> = [];
  public folderList: Array<Folder> = [];
  public mainFolders: Array<Folder> = [];
  public activeFolderId: number;
  public  math = Math;
  
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              public topElement: ElementRef) { }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.mainFolders = data.folderData.folders;
        this.parentFolder = data.folderData.parentFolder;
      });
      this.route.params.subscribe(params => {
        let subfolderId = parseInt(params['subfolder_id']);
        if (Number.isNaN(subfolderId)) {
          subfolderId = this.mainFolders[0].id;
         }
         this.getFolderContent(subfolderId);
         this.breadcrumbService.updateBreadcrumb(subfolderId, true);
    });  
    window.scroll(0,0);
  }

getFolderContent(folderId: number) {
    this.activeFolderId = folderId;
    this.dataService.getFolderData(folderId)
    .subscribe( response  => {
      this.contentList = response.content;
      this.folderList = response.folders;
    });
  }
}
