import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { passValidator } from './validator';
import { LoginService } from '../core/authentication/login.service';
import { UserService } from '../user.service';

export interface EachUser {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  userid: ""
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userid: ""
  };

  form: FormGroup;
  userNameConflict: boolean = false;

  hide = true;

  fullEye = true;
  scratchedEye = false;

  users: EachUser[] = [];

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private loginService: LoginService,
    private _userService: UserService
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z]{4,15}')]],
      lastname: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z]{4,15}')]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z0-9@._!]{4,25}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-z0-9@._!]{4,25}'), this.noWhitespaceValidator]], cnfpass: ['', [Validators.required, Validators.minLength(4), passValidator]]
    });

    this.form.controls.password.valueChanges
      .subscribe(
        x => this.form.controls.cnfpass.updateValueAndValidity()
      )
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit() {
    this._userService.getUsers()
      .subscribe((response) => {
        this.users = response;
      })
  }

  changeEye() {
    this.fullEye = !this.fullEye;
    this.scratchedEye = !this.scratchedEye;

  }

  isFullEye(): boolean {
    return this.fullEye;
  }

  isScratchedEye(): boolean {
    return this.scratchedEye;
  }

  crossCheckUsername(username: any) {
    let userExists = false;
    for (let i = 0; i < this.users.length; i++) {
      if (username === this.users[i].email) {
        userExists = true;
        this.userNameConflict = true;
        break;
      }
      else {
        this.userNameConflict = false;
        userExists = false;
      }
    }
  }

  registerUser() {
    if (!this.form.valid) return;
    this.form.markAsTouched();
    this.registerUserData.firstName = this.form.value.firstname;
    this.registerUserData.lastName = this.form.value.lastname;
    this.registerUserData.email = this.form.value.username;
    this.registerUserData.password = this.form.value.password;
    var randomUserId = Math.random().toString(36).substr(2, 9);
    this.registerUserData.userid = randomUserId;
    console.log(this.registerUserData);

    // this._auth.registerUser(this.registerUserData)
    // .subscribe(
    //   res => {
    //     // localStorage.setItem('token', res.token);
    //     this.loginService.processLogin(res).subscribe();
    //     // this._router.navigate(['/articles']);
    //   },
    //   err => console.log(err)
    // )
  }

}
