import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {
  
  updatedPost={
    title: "",
    articleid: "",
    content: "",
    date: "",
    contributor: ""
  };

  articles = []

  editorForm: FormGroup;
  //lstarts: Posts[];
  //lstcomments: Comments[];

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      ['link', 'image']
    ]
  }

  constructor(private messageService: MessageService, private _articleService: ArticleService, private _authService: AuthService) { }

  display: boolean = false;

  deletePostId:number;

  showDialog(id) {
      this.display = true;
      this.deletePostId=id
  } 

  addSingle() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Article updated'});
  }

  deleteSingle() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Article deleted'});
  }

  ngOnInit() {
    this._authService.getMyArticles()
    .subscribe(
      res => this.articles = res,
      err => console.log(err)
    );

    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  onPress(isDelete) {
    if(isDelete && this.deletePostId)  {
      this.deleteSingle();
      setTimeout( () => { window.location.reload(); }, 1000 );
      this._articleService.deleteArticle(this.deletePostId)
      .subscribe (
        data => {
          console.log("deleted");
        }
      );
   }
   else {
    this.deletePostId = null;
   }    
  }

  onPress2(id) {
    this.updatedPost.articleid=id;
    this._articleService.fetchArticle(id)
    .subscribe (
      data => {
        (<HTMLInputElement>document.querySelector('#title-container')).value=data.title;
        this.editorForm = new FormGroup({
          'editor': new FormControl(data.content)
        });
      }
    );
  }

  onSubmit() {
    var titleFromField= (<HTMLInputElement>document.getElementById("title-container")).value;
    var content = this.editorForm.get('editor').value;
    var contributor = localStorage.getItem('firstname') +" "+localStorage.getItem('lastname');
    var date = new Date().toUTCString();

    this.updatedPost.title=titleFromField;
    this.updatedPost.content=content;
    this.updatedPost.date=date;
    this.updatedPost.contributor=contributor; 

    this._articleService.updateAnArticle(this.updatedPost)
    .subscribe (
      res => {
        (<HTMLInputElement>document.getElementById("title-container")).value="";
        this.editorForm.reset();
        this.addSingle();
      },
      err => console.log(err)
    );
  }
}
