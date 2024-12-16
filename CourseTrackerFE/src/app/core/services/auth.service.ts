import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

  private token?: string;

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
    this.token = token;
  }
  getToken() {
    if (!this.token) this.token = localStorage.getItem(this.TOKEN_STORAGE_KEY) || undefined;
    return this.token;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    this.token = undefined;
  }

}
