import { Component } from '@angular/core';
import {SearchQuery} from './search-query';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router){

  }
  title = 'wiki-learn';
  searchQuery = new SearchQuery('');
}
