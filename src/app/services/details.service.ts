import { Injectable } from '@angular/core';
const wiki = require('wikijs').default;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  getSummary(title){
    return wiki().page(title).then(page => page.summary());
  }

  getImageURL(title){
    // wiki().page(title).then(page => page.images()).then(console.log);
    return wiki().page(title).then(page => page.images());
  }
}
