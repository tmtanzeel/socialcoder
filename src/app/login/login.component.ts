import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../core/authentication/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flag= {
    valid: true
  }

  message: string ='';

  hide=true;

  fullEye=true;
  scratchedEye=false;

  credentialsSubmitted: boolean = false;
  responseAwaited: boolean = true;

  loginUserData ={
    email: "",
    password: ""
  };

  constructor( 
    private _auth: AuthService, 
    private _router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

  changeEye() {
    this.fullEye=!this.fullEye;
    this.scratchedEye=!this.scratchedEye;
    
  }

  isFullEye() : boolean {
    return this.fullEye;
  }

  isScratchedEye(): boolean {
    return this.scratchedEye;
  }

 
  onSubmit() {
    this.credentialsSubmitted = true;
    this.responseAwaited=true;
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('firstname', res.user.firstName);
        // localStorage.setItem('lastname', res.user.lastName);
        // localStorage.setItem('userid', res.user.userid);
        // this._router.navigate(['/articles']);
        this.loginService.processLogin(res).subscribe();
        this.responseAwaited=false;
        this.credentialsSubmitted = false;
      },
      err => {
        this.flag.valid=false,
        this.responseAwaited=false;
        this.credentialsSubmitted=false;
        // document.querySelector('#login-denied').innerHTML="hello";
        this.message=err.error;
      }
    )
  }
}