import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { MessageService } from 'primeng/components/common/api';
import { AuthService } from '../auth.service';

export interface MyObject {
  content: string;
}
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleId: String = '';
  article;
  showButtonPanel: boolean = false;
  articleDetails: { title?: string, content?: string, contributor?: string, upvotes?: number, upvoters?: string[], downvotes?: number, downvoters?: string[] } = { content: '' };


  currentLoggedInUserId: string;

  currentUpvotes = this.articleDetails.upvotes;
  currentDownvotes = this.articleDetails.downvotes;

  allowUpvote = true;
  allowDownvote = true;

  msg1 = "I found this article very useful.";
  msg2 = "You've already upvoted this article.";
  msg3 = "Useless! Not worth reading.";
  msg4 = "You've already downvoted this article.";


  updatedVotes = {
    articleid: "",
    upvotes: 0,
    downvotes: 0,
    upvoters: [],
    downvoters: []
  };

  constructor(private messageService: MessageService, private router: Router, private _articleService: ArticleService, private _router: ActivatedRoute, public _authService: AuthService) { }

  showUpvoteConfirmation() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Your upvote is added' });
  }

  showDownvoteConfirmation() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Your downvote is added' });
  }

  ngOnInit() {
    const id = this._router.snapshot.paramMap.get('id');
    this.getArticleById(id);
  }

  getArticleById(id: string) {
    this._articleService.getArticleById(id).subscribe({
      next: product => this.onAlbumRetrieved(product)
    })
  }

  // to keep the code clean and extend some functionality
  onAlbumRetrieved(article: any): void {

    this.article = article;
    //this.totalUpvotes = this.article.upvotes.length;

    this.showButtonPanel = true;
    this.updatedVotes.articleid = article.articleid;
    this.currentUpvotes = this.article.upvoters.length;
    console.log(this.currentUpvotes);

    this.currentDownvotes = this.article.downvoters.length;

    this.articleDetails.upvotes = this.article.upvotes;
    this.articleDetails.downvotes = this.article.downvotes;
    document.querySelector('#data-container').innerHTML = this.article.content;
    this.onPageLoad();
  }

  onPageLoad() {
    if (this.isAnUpvoter()) {
      this.allowUpvote = false;
      this.allowDownvote = true;
    }
    else {
      this.allowUpvote = true;
      if (this.isADownvoter()) {
        this.allowDownvote = false;
        this.allowUpvote = true;
      }
      else {
        this.allowUpvote = true;
        this.allowDownvote = true;
      }
    }
  }

  isAnUpvoter(): boolean {
    let found = false;
    if (this._authService.loggedIn()) {
      const fetchedUserProfileAsString = localStorage.getItem('userProfile');
      const parsedSameToObject = JSON.parse(fetchedUserProfileAsString);
      this.currentLoggedInUserId = parsedSameToObject.userid;
      this.article.upvoters.forEach(user => {
        if (user === this.currentLoggedInUserId) {
          found = true;
        }
      });
    }
    return found;
  }

  isADownvoter(): boolean {
    let found = false;
    if (this._authService.loggedIn()) {
      const fetchedUserProfileAsString = localStorage.getItem('userProfile');
      const parsedSameToObject = JSON.parse(fetchedUserProfileAsString);
      this.currentLoggedInUserId = parsedSameToObject.userid;
      this.article.downvoters.forEach(user => {
        if (user === this.currentLoggedInUserId) {
          found = true;
        }
      });
    }
    return found;
  }

  back() {
    this.router.navigate(['/articles'])
  }

  upvoted() {
    this.allowUpvote = false;
    this.allowDownvote = true;
    if (this.isADownvoter()) {
      this.addUserToUpvotersList();  //done
      this.removeUserFromDownvotersList();
    }
    else {
      this.addUserToUpvotersList();
    }
    this.showUpvoteConfirmation();
    setTimeout(() => { window.location.reload() }, 3000);
  }

  downvoted() {
    this.allowUpvote = true;
    this.allowDownvote = false;
    if (this.isAnUpvoter()) {
      this.addUserToDownvotersList();
      this.removeUserFromUpvotersList();
    }
    else {
      this.addUserToDownvotersList();
    }
    setTimeout(() => { window.location.reload() }, 3000);
    this.showDownvoteConfirmation();
  }

  addUserToUpvotersList() {
    const fetchedString = localStorage.getItem('userProfile');
    const parsedToObject = JSON.parse(fetchedString);
    const userWhoUpvoted = parsedToObject.userid;
    const articleGotUpvoted = this.updatedVotes.articleid;
    this._articleService.addUserToUpvotersList(userWhoUpvoted, articleGotUpvoted)
      .subscribe(
        res => {
          console.log("Response: ", res);
        }
      );
  }

  removeUserFromUpvotersList() {
    const fetchedString = localStorage.getItem('userProfile');
    const parsedToObject = JSON.parse(fetchedString);
    const userWhoDownvoted = parsedToObject.userid;
    const articleGotDownvoted = this.updatedVotes.articleid;
    this._articleService.removeUserFromUpvotersList(userWhoDownvoted, articleGotDownvoted)
      .subscribe(
        res => {
          console.log("Response: ", res);
        }
      );
  }

  addUserToDownvotersList() {
    const fetchedString = localStorage.getItem('userProfile');
    const parsedToObject = JSON.parse(fetchedString);
    const userWhoDownvoted = parsedToObject.userid;
    const articleGotDownvoted = this.updatedVotes.articleid;
    this._articleService.addUserToDownvotersList(userWhoDownvoted, articleGotDownvoted)
      .subscribe(
        res => {
          console.log("Response: ", res);
        }
      );
  }

  removeUserFromDownvotersList() {
    const fetchedString = localStorage.getItem('userProfile');
    const parsedToObject = JSON.parse(fetchedString);
    const userWhoUpvoted = parsedToObject.userid;
    const articleGotUpvoted = this.updatedVotes.articleid;
    this._articleService.removeUserFromDownvotersList(userWhoUpvoted, articleGotUpvoted)
      .subscribe(
        res => {
          console.log("Response: ", res);
        }
      );
  }

}