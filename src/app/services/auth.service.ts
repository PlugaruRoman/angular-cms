import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: {
    login: string;
    password: string;
  }): Observable<string | boolean> {
    if (userInfo.login === 'admin' && userInfo.password === 'admin') {
      this.setToken('123123123123123123');
      return of(true);
    }
    return throwError(() => new Error('Authentication Failed'));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
