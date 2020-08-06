import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { SortableHeader, SortEvent, compare } from '../sortable-util';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  @Input() contentList:[];
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor() { }

  ngOnInit(): void {
  }
  getFileExtension(fileName:string) : string
  {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
    switch (ext){
      case 'mp4':
        return 'assets/images/static/mp4.png';
      case 'pdf':
        return 'assets/images/static/file.png';
      default:
        return 'assets/images/static/file.png';
    }
  }
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    let res;
    this.contentList.sort((a, b) => {
      if(column == "file_size")
      {
        res = a[column] - b[column];
      }
      else{
       res = compare(a[column], b[column]);
      }
      return direction === 'asc' ? res : -res;
    });
  
  }
}
