import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  role= 'standardUser';
  ipAddress: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUserIpAddress().then(response => this.ipAddress = response.ip);
  }

  register(firstName, lastName, email, phone, username, password, role){
    this.userService.register({firstName: firstName, lastName: lastName, email: email, phone: phone, username: username, password: password, role: role, ipAddress: this.ipAddress})
      .then(response => {
        console.log(response);
        if(response.status == 500){
          alert("Sign-up Failed, username already exists");
          this.router.navigate(['/register']);
        } else{
          this.router.navigate(['/login']);
        }
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      })
  }




}
