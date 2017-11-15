import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {

  authToken: any
  user: any

  constructor(private http: Http) { }

  loginUser(user) {
    return this.http.post('http://localhost:3000/api/login', user)
      .map(res => res.json());
  }

  getInfo() {
    let headers = new Headers();
    this.loadToken()
    headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/api/admin', { headers: headers })
      .map(res => res.json())
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
    this.authToken = token
    this.user = user
  }

  loadToken() {
    const token = localStorage.getItem('token')
    this.authToken = token
  }

  loggedIn() {
    return tokenNotExpired()
  }

  logout() {
    this.authToken = null
    this.user = null
    localStorage.clear()
  }

}
