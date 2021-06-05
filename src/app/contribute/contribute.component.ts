import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  makeNewPost={
    articleid: "",
    title: "",
    content: "",
    date: "",
    contributor: "",
    upvotes: 0,
    downvotes: 0
  };

  // inject: private _myApiService: MyApiService
  constructor(private messageService: MessageService, private _auth: AuthService, private _router: Router) { }

  editorForm: FormGroup;
  //lstarts: Posts[];
  //lstcomments: Comments[];

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff'
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Article submitted'});
  }

  unableToSubmit() {
    this.messageService.add({severity:'error', summary:'Failure Message', detail:'Unable to submitt'});
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

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  @ViewChild('searchInput', {static: false}) searchInputRef: ElementRef;

  onSubmit() {
    
    var titleFromField = (<HTMLInputElement>document.getElementById("inputTitle")).value.trim();
    var content = this.editorForm.get('editor').value;

    if(titleFromField==="" || content===null) {
      this.unableToSubmit();
    }
    else {
      // READ STRING FROM LOCAL STORAGE
      var retrievedObject = localStorage.getItem('userProfile');

      // CONVERT STRING TO REGULAR JS OBJECT
      var parsedObject = JSON.parse(retrievedObject);

      // ACCESS DATA
      var contributor=parsedObject.firstName+" "+parsedObject.lastName;
      
      var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      var today  = new Date();
      var contribution_date=today.toLocaleDateString("en-US", options);
    
      var randomId=Math.random().toString(36).substr(2, 9);

      this.makeNewPost.articleid=randomId;
      this.makeNewPost.title=titleFromField;
      this.makeNewPost.content=content;
      this.makeNewPost.date=contribution_date+' IST';
      this.makeNewPost.contributor=contributor;

      this._auth.pushNewPost(this.makeNewPost)
      .subscribe (
        res => {
          (<HTMLInputElement>document.getElementById("inputTitle")).value="";
          this.editorForm.reset();
          this.addSingle();
        },
        err => console.log(err)
      );
    }
  }
}
