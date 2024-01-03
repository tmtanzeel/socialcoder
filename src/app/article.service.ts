import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private _articlesUrl =
    "https://fine-gray-parrot-kilt.cyclic.app/api/articles";
  private _deleteUrl = "https://fine-gray-parrot-kilt.cyclic.app/api/delete";
  private _fetchUrl = "https://fine-gray-parrot-kilt.cyclic.app/api/fetchback";
  private _updateArtURL =
    "https://fine-gray-parrot-kilt.cyclic.app/api/update-article";
  private _addToUpvotersListURL =
    "https://fine-gray-parrot-kilt.cyclic.app/api/add-to-upvoters-list";
  private _deleteFromUpvotersListURL =
    "https://fine-gray-parrot-kilt.cyclic.app/api/remove-from-upvoters-list";
  private _addToDownvotersListURL =
    "https://fine-gray-parrot-kilt.cyclic.app/api/add-to-downvoters-list";
  private _deleteFromDownvotersListURL =
    "https://fine-gray-parrot-kilt.cyclic.app/api/remove-from-downvoters-list";
  // private _updateArtUpvotesURL = "https://fine-gray-parrot-kilt.cyclic.app/api/update-upvotes";
  // private _updateArtDownvotesURL = "https://fine-gray-parrot-kilt.cyclic.app/api/update-downvotes";
  // private _updateDownvotersListURL = "https://fine-gray-parrot-kilt.cyclic.app/api/update-upvoters-list";

  clickedArticle: Object = {};

  constructor(private http: HttpClient) {}

  getEvents() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const options = { headers: headers };
    return this.http.get<any>(this._articlesUrl, options);
  }

  deleteArticle(id) {
    return this.http.delete<any>(this._deleteUrl + "/" + id);
  }

  fetchArticle(id) {
    return this.http.get<any>(this._fetchUrl + "/" + id);
  }

  updateAnArticle(updatedArticle) {
    return this.http.put<any>(this._updateArtURL, updatedArticle);
  }

  addUserToUpvotersList(userWhoUpvoted, articleGotUpvoted) {
    return this.http.post<any>(
      this._addToUpvotersListURL +
        "/" +
        articleGotUpvoted +
        "/" +
        userWhoUpvoted,
      { responseType: "text" as "text" }
    );
  }

  removeUserFromUpvotersList(userWhoDownvoted, articleGotDownvoted) {
    return this.http.post<any>(
      this._deleteFromUpvotersListURL +
        "/" +
        articleGotDownvoted +
        "/" +
        userWhoDownvoted,
      { responseType: "text" as "text" }
    );
  }

  addUserToDownvotersList(userWhoDownvoted, articleGotDownvoted) {
    return this.http.post<any>(
      this._addToDownvotersListURL +
        "/" +
        articleGotDownvoted +
        "/" +
        userWhoDownvoted,
      { responseType: "text" as "text" }
    );
  }

  removeUserFromDownvotersList(userWhoUpvoted, articleGotUpvoted) {
    return this.http.post<any>(
      this._deleteFromDownvotersListURL +
        "/" +
        articleGotUpvoted +
        "/" +
        userWhoUpvoted,
      { responseType: "text" as "text" }
    );
  }

  setClickedArticleObj(id) {
    localStorage.setItem("__ai", id);
  }

  getClickedArticle() {
    return localStorage.getItem("__ai");
  }

  getArticleById(id: string): Observable<any> {
    return this.getAllArticles().pipe(
      map((articles: any[]) =>
        articles.find((article) => article.articleid === id)
      )
    );
  }

  getAllArticles() {
    return this.http.get<any>(this._articlesUrl);
  }
}
