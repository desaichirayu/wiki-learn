import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search.results/search.results.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from "./services/search.service";
import { PageDetailsComponent } from './page.details/page.details.component';
import {DetailsService} from "./services/details.service";
import { TagresultsComponent } from './tagresults/tagresults.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from "./services/user.service";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    PageDetailsComponent,
    TagresultsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [SearchService, DetailsService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
