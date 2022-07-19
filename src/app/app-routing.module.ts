import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { FolderDataResolver, FileDataResolver, SearchDataResolver, SearchKeywordResolver } from './services/data.service';
import { FileViewComponent } from './file-view/file-view.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AboutComponent } from './about/about.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ModuleComponent } from './module/module.component';
import { FoldersResolver } from './resolvers/folders.resolver';
import { ModulesResolver } from './resolvers/modules.resolver';
import { FolderTreeResolver } from './resolvers/folder-tree.resolver';
import { MetadataListResolver } from './resolvers/metadata-list.resolver';
import { DatesResolver } from './resolvers/dates.resolver';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { folders: FoldersResolver, modules: ModulesResolver }
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { folders: FoldersResolver, modules: ModulesResolver }
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'index',
    component: IndexPageComponent,
    resolve: { folderTree: FolderTreeResolver }
  },
  {
    path: 'content/:folder_id',
    component: FolderViewComponent,
    resolve: { folderData: FolderDataResolver }
  },
  {
    path: 'content/:folder_id/:subfolder_id',
    component: FolderViewComponent,
    resolve: { folderData: FolderDataResolver }
  },
  {
    path: 'file-view/:content_id',
    component: FileViewComponent,
    resolve: { fileData: FileDataResolver }
  },
  {
    path: 'search-list',
    component: SearchListComponent,
    resolve: { metadataList: MetadataListResolver, dates: DatesResolver }
  },
  {
    path: 'search-list/keyword/:search_string',
    component: SearchListComponent,
    resolve: { searchResult: SearchKeywordResolver, metadataList: MetadataListResolver, dates: DatesResolver }
  },
  {
    path: 'search-list/:search_string',
    component: SearchListComponent,
    resolve: { searchResult: SearchDataResolver, metadataList: MetadataListResolver, dates: DatesResolver }
  },
  {
    path: 'module/:id',
    children: [ {
      path: '**',
      component: ModuleComponent
    } ]
  },
  /*404 page
  {
    path: '**',
    component: HomeComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
