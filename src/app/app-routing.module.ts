import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { FolderDataResolveService, FileDataResolveService, SearchDataResolveService, SearchKeywordResolveService } from './services/data.service';
import { FileViewComponent } from './file-view/file-view.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AboutComponent } from './about/about.component';
import { IndexPageComponent } from './index-page/index-page.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'index', component: IndexPageComponent },
  { path: 'content/:folder_id', component: FolderViewComponent, resolve: { folderData: FolderDataResolveService } },
  { path: 'content/:folder_id/:subfolder_id', component: FolderViewComponent, resolve: { folderData: FolderDataResolveService } },
  { path: 'file-view/:content_id', component: FileViewComponent, resolve: { fileData: FileDataResolveService } },
  { path: 'search-list', component: SearchListComponent},
  { path: 'search-list/keyword/:search_string', component: SearchListComponent,resolve: { searchResult: SearchKeywordResolveService } },
  { path: 'search-list/:search_string', component: SearchListComponent,resolve: { searchResult: SearchDataResolveService} },
  { path: '', component: HomeComponent},
  { path: '*', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
