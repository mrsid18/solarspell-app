import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  public tree = [];
  public options = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    //Scroll to top on page load because going forward or back via browser closes the tree
    this.scroller.scrollToPosition([0,0]);
    this.tree = this.route.snapshot.data.folderTree;
  }

  navigate($event) {
    this.router.navigate(['/content', $event.node.data.id]);
  }
}
