import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';

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
import { AboutComponent } from './about/about.component';
import { ConfigService } from './services/config.service';
import { FooterComponent } from './footer/footer.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { FileUnitPipe } from './file-unit.pipe';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeES from '@angular/common/locales/es';
import localeAr from '@angular/common/locales/ar';
import { ModuleComponent } from './module/module.component';

registerLocaleData(localeFr, localeES);

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
    SortableHeader,
    AboutComponent,
    FooterComponent,
    IndexPageComponent,
    FileUnitPipe,
    ModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    TreeModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          return configService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
