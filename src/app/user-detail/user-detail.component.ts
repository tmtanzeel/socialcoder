import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Profile } from '../core/adaptors/profile.model';
import { UserProfileService } from '../core/authentication/user-profile.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userSkills = [];
  public userProfile$: Subscription;
  public userProfile: Profile;

  constructor(
    private _userService: UserService,
    private profileservice: UserProfileService,
  ) { }

  ngOnInit() {
    this.userProfile$ = this.profileservice.userProfile$.subscribe(
      userProfile$ => {
        this.userProfile = userProfile$
      }
    );
    this._userService.getUsers().subscribe(res => {
      const output = res.filter((item) => {
        if (item.firstName === this.userProfile.firstName) {
          return item;
        }
      })
      this.userSkills = [...output[0].skills];
    })
  }
}
