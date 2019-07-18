import { Injectable } from '@angular/core';
const wiki = require('wikijs').default;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  getDetails(title){
    return wiki().page(title).then(page => page.summary());
  }
}
