import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search.results/search.results.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from "./services/search.service";
import { PageDetailsComponent } from './page.details/page.details.component';
import {DetailsService} from "./services/details.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    PageDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SearchService, DetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
