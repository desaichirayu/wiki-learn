import {Component, OnInit} from '@angular/core';
import {SearchQuery} from './search-query';
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
  user = new User();
  title = 'wiki-learn';
  searchQuery = new SearchQuery('');

  constructor(private userService: UserService ,private router: Router, private cookieService: CookieService){
    // console.log("AppComponent: Constructor called");
    // this.userService.authenticate(this.cookieService.get("user")).then(response => this.user=response);
  }


  ngOnInit() {
    console.log("AppComponent: ngOnInit called");
    this.userService.authenticate(this.cookieService.get("user")).then(response => this.user=response);
  }

  checkSession(){
    console.log("AppComponent: Check Session called");
    this.userService.authenticate(this.cookieService.get("user")).then(response => this.user=response);
  }

  doLogout(){
    this.userService.logout(JSON.stringify(this.user)).then(() => {this.user = new User()});
    this.router.navigateByUrl('/login', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/']));
  }
}
