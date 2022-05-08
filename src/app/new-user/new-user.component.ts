import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registrationForm: FormGroup;
  skills = [
    { name: 'fdsfds', value: 'dsfds' }
  ];
  selectedSkills;
  constructor() { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userDetails: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        userName: new FormControl('')
      }),
      password: new FormControl(''),
      passwordConfirm: new FormControl('')
    })
  }

  onSubmit() {
    console.log(this.registrationForm);

  }

}
