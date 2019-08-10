import { Injectable } from '@angular/core';
const wiki = require('wikijs').default;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  doSearch(query){
    return wiki().search(query, 10);
  }
}
