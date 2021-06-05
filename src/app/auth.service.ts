import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }
  private _registerUrl = "https://obscure-tundra-38074.herokuapp.com/api/register";
  public _loginUrl = "https://obscure-tundra-38074.herokuapp.com/api/login";
  private _contributeUrl = "https://obscure-tundra-38074.herokuapp.com/api/contribute";
  private _askUrl = "https://obscure-tundra-38074.herokuapp.com/api/ask";
  private _deleteArtURL = "https://obscure-tundra-38074.herokuapp.com/api/delete-article";
  private _onlyMyArticlesUrl = "https://obscure-tundra-38074.herokuapp.com/api/articles";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  options = { headers: this.headers };

  registerUser(user) {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this._http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  pushNewPost(newPost) {

    return this._http.post<any>(this._contributeUrl, newPost, this.options);
  }

  pushNewQuest(newQuest) {
    return this._http.post<any>(this._askUrl, newQuest);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteAnArticle() {
    return this._http.delete<any>(this._deleteArtURL);
  }

  getMyArticles() {
    // READ STRING FROM LOCAL STORAGE
    var retrievedObject = localStorage.getItem('userProfile');

    // CONVERT STRING TO REGULAR JS OBJECT
    var parsedObject = JSON.parse(retrievedObject);
    
    // ACCESS DATA
    var person=parsedObject.firstName+" "+parsedObject.lastName;
    console.log("person ", person);
    
    return this._http.get<any>(this._onlyMyArticlesUrl+'/'+person);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('userProfile');
    this._router.navigate(['/articles']);
  }
}
