import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  public tree = [];
  public options = {};
  constructor(private dataService: DataService,
    public router: Router) { }

  ngOnInit(): void {
    this.getFolders();
  }

  navigate($event) {
    console.log($event);
    this.router.navigate(['/content', $event.node.data.id]);
  }

  getFolders() {
    this.dataService.getFolderTree()
    .subscribe( response  => {
      this.tree = response;
    });
  }
}
