import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbList: Array<Breadcrumb> = [];
  constructor(public breadcrumbService: BreadcrumbService) { }
  ngOnInit(): void {
    // this.breadcrumbList = this.breadcrumbService.getBreadcrumbList();
    this.breadcrumbService.getBreadcrumbList().subscribe((breadcrumbList: Breadcrumb[]) => {
      this.breadcrumbList = breadcrumbList;
    });
  }
}

export class Breadcrumb {
  id: number;
  name: string;
}
