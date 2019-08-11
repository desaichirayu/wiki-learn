import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagserviceService {

  constructor() { }


  HOST_BACKEND_LOCAL = 'http://localhost:8080';
  HOST_BACKEND_REMOTE = '';

  backendChoice = this.HOST_BACKEND_LOCAL;

  URL_FIND_TAG_PAGES = this.backendChoice+'/api/tags/{tid}/pages';


  findPagesForTag(tid){
    return fetch(this.URL_FIND_TAG_PAGES.replace("{tid}",tid),{
      method: 'GET',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>response.json())
  }


}
