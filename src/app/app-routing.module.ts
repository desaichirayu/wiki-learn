import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultsComponent} from './search.results/search.results.component';
import {PageDetailsComponent} from "./page.details/page.details.component";
import {TagresultsComponent} from './tagresults/tagresults.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {path:"search/:query",component:SearchResultsComponent},
  {path:"details/:title",component:PageDetailsComponent},
  {path:"tags/:tid/:tname",component:TagresultsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component: ProfileComponent},
  {path:"profile/:pid", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
