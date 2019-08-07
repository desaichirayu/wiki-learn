import * as constants from '../constants';
import { Injectable } from '@angular/core';

const serverUrl = constants.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticated = false;

  setAuthenticated(value){
    this.authenticated = value;
  }

  getAuthenticated(){
    return this.authenticated;
  }

  constructor() { }

  login(user){
    return fetch(serverUrl + '/api/users/login', {
      method: 'POST',
      body: user,
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  authenticate(user){
    if(!user.username){
      user.usenname = "None"
    }
    return fetch( serverUrl + '/api/users/auth/' + user.username).then(response => response.json());
  }

  logout(user){
    return fetch(serverUrl + '/api/users/logout', {
      method: 'POST',
      body: user,
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {});
  }
}
