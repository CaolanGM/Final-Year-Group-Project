import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: JSON;
  username: String;
  password: String;
  password2: String;
  oldPassword: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onUpdateSubmit() {
    const user = this.user;
    // potential code for validating old password before setting new one.
    /*
    console.log(user);
    const tmp_user = {
      username: user.username,
      password: this.oldPassword
    }
    let rightPassword = false;
    this.authService.authenticateUser(tmp_user).subscribe(data => {
      if (data.success) {
        rightPassword = true;
        console.log('success');
      } else {
        this.flashMessage.show('Old password is not correct', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['profile']);
      }
    });
    */
    if (this.password === this.password2)/* && rightPassword)*/ {
      user['password'] = this.password;
      this.authService.updateProfile(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.user);
          this.flashMessage.show('Profile Updated', {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      })
    } else {
      // delete user['password'];
      this.flashMessage.show('Passwords do not match', {cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['profile']);
    }
  }

}
