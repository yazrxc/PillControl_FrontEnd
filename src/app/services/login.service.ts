import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {

    // modificar según puerto del back
    return this.http.post('http://localhost:8083/login', request);
  }
  verificar() {
    if (typeof window !== 'undefined' && sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  showRole() {
    if (typeof window === 'undefined') return null;

    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
