import { Component, OnInit } from '@angular/core';
import { Folder } from '../models/folder';
import { Content } from '../models/content';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

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
              private sanitizer: DomSanitizer,
              public router: Router
              ) { }
  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.content = data.fileData.content;
        this.metadataList = data.fileData.metadata;
        this.parentFolder = data.fileData.parentFolder;
        this.breadcrumbService.updateBreadcrumb(this.content.id, false);
        this.fileURL= this.sanitizer.bypassSecurityTrustResourceUrl(environment.contentUrl.concat(this.content.file_name));
      });  
      window.scroll(0,0);
  }

  searchKeyword(name){
    if (name.trim() != ''){
      this.router.navigate(['/search-list/keyword', name]);
    }
  }
}
