import * as constants from '../constants';
import { Injectable } from '@angular/core';
const wiki = require('wikijs').default;

const serverUrl = constants.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }


  apiURL = 'https://en.wikipedia.org/w/api.php?action=query';
  aiURLOptions = '&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=';

  getSummary(title){
    return wiki().page(title).then(page => page.summary());
  }

  getPageImageURL(title){
    return fetch(this.apiURL + this.aiURLOptions + title)
      .then(resp => resp.json()).then(rj => rj.query.pages[0].thumbnail.source);
  }

  getRecentPages(){
    return fetch(serverUrl + '/api/pages/recent').then(response => response.json());
  }

}
