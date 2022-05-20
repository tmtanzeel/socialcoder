import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersUrl = "https://obscure-tundra-38074.herokuapp.com/api/users";

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    return this._http.get<any>(this._usersUrl);
  }
}
