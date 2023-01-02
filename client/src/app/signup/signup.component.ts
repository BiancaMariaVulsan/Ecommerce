import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupUserRequest, UserRole } from '../models/loginuser.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpUser: SignupUserRequest;
  roles: UserRole[];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.signUpUser = new SignupUserRequest();
    this.signUpUser.email = "";
    this.signUpUser.password = "";
    this.signUpUser.roleId = "";
  }

  onSignupClicked(): void {
    this.accountService.signupUser(this.signUpUser).subscribe(res => {
      localStorage.setItem("eshop-username", res.email);
      localStorage.setItem("eshop-userid", res.id);
      localStorage.setItem("eshop-jwt", res.token);
      localStorage.setItem("eshop-usertypeid", res.role.id);
      localStorage.setItem("eshop-usertype", res.role.name);

      if (res.role.name == "Admin") {
        this.router.navigate(["dashboard"]);
      } else if (res.role.name == "Customer") {
        this.router.navigate(["shop"]);
      }
    }, _ => {
      alert('Bad credentials, please try again.');
    });
  }

}
