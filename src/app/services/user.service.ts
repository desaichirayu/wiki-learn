import * as constants from '../constants';
import { Injectable } from '@angular/core';
import {User} from "../models/user.model.client";
import {StandardUser} from "../models/standard.user.model.client";
import {SuperUser} from "../models/super.user.model.client";

const serverUrl = constants.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new User();
  authenticated = false;

  getUser(){
    return this.user;
  }

  setUser(user){
    console.log(user);
    this.user = user;
  }

  getAuth(){
    return this.authenticated;
  }

  setAuth(value){
    console.log(value);
    this.authenticated = value;
  }

  constructor() { }

  login(user){
    return fetch(serverUrl + '/api/users/login', {
      method: 'POST',
      body: user,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  register(user){
    if (user.role == "standardUser") {
      let standardUser = new StandardUser();
      standardUser.firstName = user.firstName;
      standardUser.lastName = user.lastName;
      standardUser.email = user.email;
      standardUser.phone = user.phone;
      standardUser.username = user.username;
      standardUser.password = user.password;
      standardUser.ipAddress = user.ipAddress;
      return fetch(serverUrl + '/api/users/standard', {
        method: 'POST',
        body: JSON.stringify(standardUser),
        headers: {
          'content-type': 'application/json',
        }
      }).then(response => response.json());
    }
    let superUser = new SuperUser();
    superUser.firstName = user.firstName;
    superUser.lastName = user.lastName;
    superUser.email = user.email;
    superUser.phone = user.phone;
    superUser.username = user.username;
    superUser.password = user.password;
    superUser.reputation = 0;
    return fetch(serverUrl + '/api/users/super', {
      method: 'POST',
      body: JSON.stringify(superUser),
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => response.json());
  }

  authenticate(username){
    console.log(username);
    let val = "None";
    if(username != ''){
      val = username;
    }
    return fetch( serverUrl + '/api/users/auth/' + val, {
      credentials: 'include'
    }).then(response => {
      if (response.headers.get('content-type') != null) {
        return response.json();
      } else {
        return null;
      }
    });
  }

  logout(user){
    return fetch(serverUrl + '/api/users/logout', {
      method: 'POST',
      body: user,
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {});
  }

  getUserIpAddress() {
    return fetch('https://api.ipify.org/?format=json').then(response => response.json());
  }

  findUserByUserName(username){
    return fetch(serverUrl + '/api/users/un/' + username).then(response =>  response.json());
  }

  findUserById(userId){
    return fetch(serverUrl + '/api/users/' + userId).then(response => response.json());
  }

  findRecentUsers(){
    return fetch( serverUrl + '/api/users/recent').then(response => response.json());
  }

  findRecentLikedPagesForUser(userId){
    return fetch(serverUrl + '/api/users/' + userId + '/likedpagestitles').then(response => response.json());
  }

  updateUserEmail(userId, userEmail){
    return fetch(serverUrl + '/api/users/' + userId + '/updateemail/' + userEmail, {
      method: 'PUT'
    }).then(response => response.json());
  }

  updateUserPhone(userId, userPhone){
    return fetch(serverUrl + '/api/users/' + userId + '/updatephone/' + userPhone, {
      method: 'PUT'
    }).then(response => response.json());
  }
}
