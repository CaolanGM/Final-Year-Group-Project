import {Component, OnInit} from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  password2: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      password2: this.password2
    };

    // Required Field
    if (!ValidateService.validateRegister(user)) {
      this.flashMessage.show("Fill fields",
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!ValidateService.validateEmail(user.email)) {
      this.flashMessage.show("Enter a valid email",
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (!(this.password === this.password2)) {
      this.flashMessage.show("Passwords do not match",
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now registered and can log in",
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("Something went wrong",
          {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
