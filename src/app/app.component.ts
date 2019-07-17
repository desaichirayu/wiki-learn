import { Component } from '@angular/core';
import {SearchQuery} from './search-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wiki-learn';
  searchQuery = new SearchQuery('');
}
