import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FileSizePipe } from './file-size.pipe';
import { FileViewComponent } from './file-view/file-view.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ContentListComponent } from './content-list/content-list.component';
import { SortableHeader } from './sortable-util';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FolderViewComponent,
    BreadcrumbComponent,
    FileSizePipe,
    FileViewComponent,
    SearchBoxComponent,
    SearchListComponent,
    ContentListComponent,
    SortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
