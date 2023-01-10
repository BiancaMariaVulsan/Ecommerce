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
  confirmationPassword: string = "";

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.signUpUser = new SignupUserRequest();
    this.signUpUser.email = "";
    this.signUpUser.password = "";
    this.signUpUser.roleId = "d27c5d21-0aed-4e83-a5d3-63082dfa0be3";
    this.signUpUser.firstName = "";
    this.signUpUser.lastName = "";
    this.signUpUser.username = "";
    this.accountService.getRoles().subscribe(r => this.roles = r)
  }

  onSignupClicked(): void {
    this.accountService.signupUser(this.signUpUser, this.confirmationPassword).subscribe(res => {
      localStorage.setItem("eshop-email", res.email);
      localStorage.setItem("eshop-username", res.userName);
      localStorage.setItem("eshop-firstname", res.firstName);
      localStorage.setItem("eshop-lastname", res.lastName);
      localStorage.setItem("eshop-userid", res.id);
      localStorage.setItem("eshop-jwt", res.token);
      localStorage.setItem("eshop-usertypeid", res.role.id);
      localStorage.setItem("eshop-usertype", res.role.name);

      if (res.role.name == "Admin") {
        this.router.navigate(["Admin"]);
      } else if (res.role.name == "Customer") {
        this.router.navigate(["shop"]);
      }
    }, _ => {
      alert('Bad credentials, please try again.');
    });
  }

  setRole(event) {
    this.signUpUser.roleId = event.target.value;
  }

}
