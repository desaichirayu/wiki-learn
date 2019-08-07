import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search.results/search.results.component';
import {FormsModule} from '@angular/forms';
import {SearchService} from "./services/search.service";
import { PageDetailsComponent } from './page.details/page.details.component';
import {DetailsService} from "./services/details.service";
import {UserProfileComponent} from './user.profile/user.profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    PageDetailsComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent
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
