import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserReply, LoginUserRequest, SignupUserRequest, UserRole } from '../models/loginuser.model';

@Injectable ()
export class AccountService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) {}

    getRoles() {
        return this.http.get<UserRole[]>(this.APIUrl + 'accounts/roles/');
    }

    loginUser(loginUserInformation: LoginUserRequest): Observable<LoginUserReply> {
        return this.http.post<LoginUserReply>(this.APIUrl + 'accounts/login/', loginUserInformation);
    }

    signupUser(loginUserInformation: SignupUserRequest, confirmationpassword: string): Observable<LoginUserReply> {
        if (confirmationpassword == loginUserInformation.password)
            return this.http.post<LoginUserReply>(this.APIUrl + 'accounts/signup/', loginUserInformation);
        else
            alert('Please make sure that you typed the password correctly!')
    }
}