import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginService } from '../core/authentication/login.service';
import { UserService } from '../user.service';
export interface User {
  firstname: "",
  lastname: "",
  userName: "",
  password: "",
  skills: []
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registrationForm: FormGroup;
  skillsCount: number;
  showWarning: boolean;
  users: User[];
  registerUserData = {
    firstName: "",
    lastName: "",
    password: "",
    userName: "",
    skills: []
  };
  userNameConflict: boolean = false;

  constructor(
    private _authService: AuthService,
    private _loginService: LoginService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.skillsCount = 0;
    this.showWarning = false;
    // fetch user list to cross check username conflict
    this._userService.getUsers()
      .subscribe((response) => {
        console.log(response);

        this.users = response;
      })


    this.registrationForm = new FormGroup({
      userDetails: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        userName: new FormControl('')
      }),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      skills: new FormControl('')
    })
  }

  // currently not in use
  // crossCheckUsername(username: any) {
  //   let userExists = false;
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (username === this.users[i].email) {
  //       userExists = true;
  //       this.userNameConflict = true;
  //       console.log("unsafe");

  //       break;
  //     }
  //     else {
  //       this.userNameConflict = false;
  //       console.log("Safe");
  //       userExists = false;
  //     }
  //   }
  // }

  onSubmit() {
    this.registerUserData.firstName = this.registrationForm.controls.userDetails.value.firstName;
    this.registerUserData.lastName = this.registrationForm.controls.userDetails.value.lastName
    this.registerUserData.userName = this.registrationForm.controls.userDetails.value.userName;
    this.registerUserData.password = this.registrationForm.controls.password.value;
    this.registerUserData.skills = this.registrationForm.controls.skills.value;
    this._authService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token);
          this._loginService.processLogin(res).subscribe();
          // this._router.navigate(['/articles']);
        },
        err => console.log(err)
      )
  }

  countSkills(e) {
    this.skillsCount = this.registrationForm.controls.skills.value.length;
    if (this.skillsCount > 5) {
      this.showWarning = true;
    }
    else {
      this.showWarning = false;
    }
  }

}
