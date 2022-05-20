import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  registrationForm: FormGroup;
  skillsCount: number;
  showWarning: boolean;

  constructor() { }

  ngOnInit() {
    this.skillsCount = 0;
    this.showWarning = false;
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

  onSubmit() {
    console.log(this.registrationForm);
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
