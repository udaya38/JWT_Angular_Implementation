import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setTokenValue(token){
    localStorage.setItem('token',token);
  }

  getTokenValue(): string{
    return localStorage.getItem('token');
  }

  deleteTokenValue(){
    localStorage.removeItem('token');
  }
}
