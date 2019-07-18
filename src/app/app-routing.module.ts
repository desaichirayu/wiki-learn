import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultsComponent} from './search.results/search.results.component';
import {PageDetailsComponent} from "./page.details/page.details.component";


const routes: Routes = [
  {path:"search/:query",component:SearchResultsComponent},
  {path:"details/:title",component:PageDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
