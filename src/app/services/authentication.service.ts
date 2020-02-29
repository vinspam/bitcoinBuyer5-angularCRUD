import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { User } from '../models/user.model';

@Injectable() //{ providedIn: 'root' }
export class AuthenticationService {
    
  private baseUrl: string;
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
              private _router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable(); 
        this.baseUrl = environment.aws_url;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  } 

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/coins'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
    // login(username, password) {
    //     return this.http.post<any>(`${this.baseUrl}/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }
}