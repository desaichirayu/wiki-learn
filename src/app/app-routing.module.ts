import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultComponent} from './search-result/search-result.component';
import {PageDetailComponent} from './page-detail/page-detail.component';


const routes: Routes = [
  {path:"search",component:SearchResultComponent},
  {path:"detail",component:PageDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
