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
      this.router.navigate(['/search-list/keyword', name.toLowerCase()]);
    }
  }

  //Called when download button is clicked
  logDownloadAnalytics() {
    //Initialize variables
    var language = '';
    var content_type = '';
    var subject = '';

    //Loop through metadata and set corresponding variables
    this.metadataList.forEach(element => {
      switch(element['name']) {
        case 'Language':
          language = element['value'];
          break;

        case 'Subject':
          subject = element['value'];
          break;

        case 'Resource Type':
          content_type = element['value'];
          break;
      }
    });

    //Log analytics with gathered metadata
    this.dataService.logAnalytics({
      title: this.content.file_name,
      language: language,
      content_type: content_type,
      subject: subject,
      parent_folder: this.parentFolder,
      activity_type: 'download_file'
    });
  }
}
