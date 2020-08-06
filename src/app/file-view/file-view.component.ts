import { Component, OnInit } from '@angular/core';
import { Folder } from '../models/folder';
import { Content } from '../models/content';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  public parentFolder: Folder;
  public content: Content;
  public metadataList: [];
  public fileURL: SafeResourceUrl;
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.content = data.fileData.content;
        this.metadataList = data.fileData.metadata;
        this.parentFolder = data.fileData.parentFolder;
        this.breadcrumbService.updateBreadcrumb(this.content.id, false);
        this.fileURL= this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/content/'+this.content.file_name);
      });  
      window.scroll(0,0);
 
  }
}
