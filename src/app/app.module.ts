import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from "./services/search.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    PageDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
