import {Component, OnInit} from '@angular/core';
import {SearchQuery} from './search-query';
import {Router} from "@angular/router";
import {User} from "./models/user.model.client";
import {UserService} from "./services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService ,private router: Router){

  }
  title = 'wiki-learn';
  user = new User();
  username = '';
  password = '';
  authenticated= false;
  searchQuery = new SearchQuery('');

  ngOnInit() {
    this.userService.authenticate(this.user).then(response => this.userService.setAuthenticated(response));
  }

  checkSession(){
    console.log("Checking session");
    this.userService.authenticate(this.user).then(response => this.authenticated=response);
  }

  doLogin(username, password){
    this.user.username = username;
    this.user.password = password;
    this.userService.login(JSON.stringify(this.user)).then(response => this.user = response);
  }

  doLogout(){
    console.log(this.user);
    this.userService.logout(JSON.stringify(this.user)).then(() => {this.user = new User()});
  }
}
