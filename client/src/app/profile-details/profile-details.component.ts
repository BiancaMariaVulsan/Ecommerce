import { Component, OnInit } from '@angular/core';
import { LoginUserReply } from '../models/loginuser.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  loggedUser: LoginUserReply = new LoginUserReply();
  constructor() { }

  ngOnInit(): void {
    this.loggedUser.email = localStorage.getItem("eshop-username");
  }

}
