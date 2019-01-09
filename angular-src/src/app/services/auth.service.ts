import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import {tokenNotExpired} from 'angular2-jwt'

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) {
  }

  registerUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/users/register',
      user,
      {headers: headers}).map(res => res.json());
  }

  registerGuest(guest){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/guests/register',
      guest,
      {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/users/authenticate',
      user,
      {headers: headers}).map(res => res.json());
  }
  authenticateOldPassword(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/users/authenticate_pass',
      user,
      {headers: headers}).map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get(
      'http://localhost:3000/api/users/profile',
      {headers: headers}).map(res => res.json());
  }

  updateProfile(newUser) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/users/profile/edit',
      newUser,
      {headers: headers}).map(res => res.json());
  }

  storeUserAndToken(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  storeUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
