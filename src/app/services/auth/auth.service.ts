import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLogin());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(email: string) {
    sessionStorage.setItem('user', email);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }

  private checkLogin(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}