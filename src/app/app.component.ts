import { Component } from '@angular/core';
import {SearchQuery} from './search-query';
const wiki = require('wikijs').default;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wiki-learn';
  searchQuery = new SearchQuery('');
  constructor(){
    // wiki().search('star wars').then(data => {
    //   data.next().then(res=>console.log(res.results))});
  }
}
