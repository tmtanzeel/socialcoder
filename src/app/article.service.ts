import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articlesUrl = "https://obscure-tundra-38074.herokuapp.com/api/articles";
  private _deleteUrl = "https://obscure-tundra-38074.herokuapp.com/api/delete";
  private _fetchUrl = "https://obscure-tundra-38074.herokuapp.com/api/fetchback";
  private _updateArtURL = "https://obscure-tundra-38074.herokuapp.com/api/update-article";
  private _addToUpvotersListURL = "https://obscure-tundra-38074.herokuapp.com/api/add-to-upvoters-list";
  private _deleteFromUpvotersListURL = "https://obscure-tundra-38074.herokuapp.com/api/remove-from-upvoters-list";
  private _addToDownvotersListURL = "https://obscure-tundra-38074.herokuapp.com/api/add-to-downvoters-list";
  private _deleteFromDownvotersListURL = "https://obscure-tundra-38074.herokuapp.com/api/remove-from-downvoters-list";
  private _updateArtUpvotesURL = "https://obscure-tundra-38074.herokuapp.com/api/update-upvotes";
  private _updateArtDownvotesURL = "https://obscure-tundra-38074.herokuapp.com/api/update-downvotes";
  private _updateDownvotersListURL = "https://obscure-tundra-38074.herokuapp.com/api/update-upvoters-list";


  clickedArticle : Object = {};

  constructor(private http: HttpClient) { }

  getEvents() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    return this.http.get<any>(this._articlesUrl, options);
  }

  deleteArticle(id) {
    return this.http.delete<any>(this._deleteUrl+'/'+id);
  }

  fetchArticle(id) {
    return this.http.get<any>(this._fetchUrl+'/'+id);
  }

  updateAnArticle(updatedArticle) {
    return this.http.put<any>(this._updateArtURL, updatedArticle);
  }

  increaseUpvote(updatedArticle, id) {
    return this.http.put<any>(this._updateArtUpvotesURL+'/'+id, updatedArticle);
  }

  addUserToUpvotersList(updatedArticle, id, id1) {
    return this.http.put<any>(this._addToUpvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  removeUserFromUpvotersList(updatedArticle, id, id1) {
    return this.http.delete<any>(this._deleteFromUpvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  addUserToDownvotersList(updatedArticle, id, id1) {
    return this.http.put<any>(this._addToDownvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  removeUserFromDownvotersList(updatedArticle, id, id1) {
    return this.http.delete<any>(this._deleteFromDownvotersListURL+'/'+id+'/'+id1, updatedArticle);
  }

  decreaseUpvote(updatedArticle, id) {
    return this.http.put<any>(this._updateArtDownvotesURL+'/'+id, updatedArticle);
  }

  setClickedArticleObj(id) {
    localStorage.setItem('__ai', id);
  }

  getClickedArticle() {
    return localStorage.getItem('__ai');
  }

  getArticleById(id: string): Observable<any>  {
    return this.getAllArticles()
      .pipe(
        map((articles: any[]) => articles.find(article => article.articleid === id))
      );
}

  getAllArticles() {
    return this.http.get<any>(this._articlesUrl)
  }
}
