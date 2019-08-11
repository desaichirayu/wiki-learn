import { Injectable } from '@angular/core';
import * as constants from '../constants'

const serverUrl = constants.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class TagserviceService {

  constructor() { }

  HOST_BACKEND_LOCAL = 'http://localhost:8080';
  HOST_BACKEND_REMOTE = serverUrl;

  backendChoice = this.HOST_BACKEND_REMOTE;

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
