import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../models/user.model.client";
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;

  constructor(private userService:UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login(username, password) {
      const user  = new User();
      user.username = username;
      user.password = password;
      this.userService.login(JSON.stringify(user)).then(response => this.finishUp(response));
  }

  finishUp(response){
    if(response){
      console.log(response);
      let user = new User();
      user = response;
      this.cookieService.set("user", user.username);
      console.log(JSON.stringify(this.cookieService.get("user")));
      this.router.navigateByUrl('/profile', {skipLocationChange: true})
        .then(()=>this.router.navigate(['/']));
    } else{
      alert("Login Failed Check Your Username Password");
      this.router.navigate(['/login'], {skipLocationChange: true})
    }
  }
}
