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
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
  let token = sessionStorage.getItem('token');
  if (!token) {
    console.log('No token found!');
    return null;
  }
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(token);
  console.log(decodedToken); // Verifica que el token se decodifica correctamente
  return decodedToken?.role;
}
}
