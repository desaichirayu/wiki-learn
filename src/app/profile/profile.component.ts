import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailsService} from "../services/details.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user= {
    "id": -1,
    "username": "dummy",
    "firstName": "dummy",
    "lastName": "dummy",
    "email": "dummy@dummymail.com",
    "phone": "0000000000"
  };
  otherUserProfile = false;
  pageURL= '/profile';
  profileIcon = '../../assets/images/user_profiles/' + this.getRandomIconNumber() + '.png';
  recentUsers = [];
  recentPages = [];
  recentlyLikedPages = [];
  editing_e = false;
  editing_p = false;
  userEmail = '';
  userPhone = '';

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private activatedRoute: ActivatedRoute, private detailsService: DetailsService) {
    console.log("Profile Component Cons called");
    this.profileIcon = '../../assets/images/user_profiles/' + this.getRandomIconNumber() + '.png';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log("ProfileComponent: ngOnInit activateRoute called");
      if(params.pid){
        this.userService.findUserById(parseInt(params.pid)).then(response => {
          this.otherUserProfile = true;
          this.postAuth(response);
        });
      } else{
        this.userService.authenticate(this.cookieService.get("user")).then(response => this.postAuth(response));
      }
    });
  }

  postAuth(response){
    this.user=response;
    // this.profileIcon = this.profileIcon.replace("###", this.user.firstName + '+' + this.user.lastName);
    this.profileIcon = '../../assets/images/user_profiles/' + this.getRandomIconNumber() + '.png';
    this.pageURL = this.router.url;
    this.userService.findRecentUsers().then(res => this.recentUsers = res);
    this.detailsService.getRecentPages().then(res => this.recentPages = res);
    this.userService.findRecentLikedPagesForUser(this.user.id).then(res => this.recentlyLikedPages = res);
  }

  clickEmailEdit(){
    this.editing_e = !this.editing_e;
  }

  clickPhoneEdit(){
    this.editing_p = !this.editing_p;
  }

  clickEmailUpdate(userEmail){
    this.editing_e = !this.editing_e;
    this.userEmail = userEmail;
    this.userService.updateUserEmail(this.user.id, this.userEmail).then(response => this.user = response);
  }

  clickPhoneUpdate(userPhone){
    this.editing_p = !this.editing_p;
    this.userPhone = userPhone;
    this.userService.updateUserPhone(this.user.id, this.userPhone).then(response => this.user = response);
  }

  getRandomIconNumber(){
    return Math.floor(Math.random() * 5) + 1;
  }

}
