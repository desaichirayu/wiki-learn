import {Component, OnInit} from '@angular/core';
import {SearchQuery} from './search-query';
const wiki = require('wikijs').default;
import {Router} from "@angular/router";
import {User} from "./models/user.model.client";
import {UserService} from "./services/user.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  user = null;
  title = 'wiki-learn';
  pageURL= '/';
  searchQuery = new SearchQuery('');

  recentUsers = [];
  recentLikedPages = [];
  userFN = "";
  userLN = "";


  constructor(private userService: UserService ,private router: Router, private cookieService: CookieService){
    // this.pageURL = this.router.url;
  }


  ngOnInit() {
    console.log("AppComponent: ngOnInit called");
    this.userService.authenticate(this.cookieService.get("user")).then(response => this.handleResponse(response));
  }

  handleResponse(response){
    this.user = response;
    this.pageURL = this.router.url;
    if(this.user){
      this.userFN = this.user.firstName;
      this.userLN = this.user.lastName;
      this.userService.findRecentLikedPagesForUser(this.user.id).then(response => {
        this.recentLikedPages = response;
      });
    }
    this.userService.findRecentUsers().then(response => {
      this.recentUsers = response;
      if(this.user){
        this.recentUsers = this.recentUsers.filter(usr => usr.firstName != this.user.firstName);
      }
    });
  }

  checkSession(){
    console.log("AppComponent: Check Session called");
    this.userService.authenticate(this.cookieService.get("user")).then(response => this.handleResponse(response));
  }

  navigateHome(){
    this.router.navigateByUrl('/pass', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/']));
  }

  doLogout(){
    this.userService.logout(JSON.stringify(this.user)).then(() => {this.user = null});
    this.cookieService.deleteAll("user");
    this.cookieService.deleteAll("user", "localhost");
    this.cookieService.deleteAll("user", "/");
    this.cookieService.deleteAll("user", "wiki-learn.herokuapp.com");
    this.router.navigateByUrl('/pass', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/']));
  }
}
