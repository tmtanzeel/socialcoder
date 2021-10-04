import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _commitHistoryUrl = "https://github-api-nodejs.herokuapp.com/api/github/commitinfo/tmtanzeel/socialcoder";

  constructor(private http: HttpClient) {
    // console.log("service is now ready!");
  }

  ngOnInit() {
  }

  getCommitHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    return this.http.get<any>(this._commitHistoryUrl, options);
  }

}
