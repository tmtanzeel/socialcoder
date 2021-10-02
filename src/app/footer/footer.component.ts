import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

import { GithubService } from '../github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // private username: string = "tmtanzeel";
  // private clientid = 'Iv1.acb84c4d836f164b';
  // private clientsecret = '4cb30cb5599060e01244a8f55168ec9758d6e3c4';

  constructor(private _gitService: GithubService) { }

  mergeHistory: String;
  pushedBy: String;
  mergeLink: String;
  timeStamp: Date;
  userLink: String;

  ngOnInit() {
    this.getLastesMergeHistory();
  }

  getLastesMergeHistory() {
    console.log("called");
    this._gitService.getCommitHistory()
      .subscribe(
        res => {
          this.mergeHistory = res[0].commit.message;
          this.pushedBy = res[0].author.login;
          this.timeStamp = res[0].commit.author.date;
          this.mergeLink = res[0].html_url;
          this.userLink = "https://github.com/" + this.pushedBy;

        },
        err => console.log(err)
      )
  }

}
