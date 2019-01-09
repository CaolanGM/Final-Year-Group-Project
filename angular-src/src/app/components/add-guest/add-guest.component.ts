import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { AuthService} from "../../services/auth.service";
import {GuestViewService} from "../../services/guestView.service";
import { FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  editing: boolean;
  id: String;
  name: String;
  email: String;
  phone: String;
  eventsAttended: Number;
  donationTotal : Number;
  dietary: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private guestViewService: GuestViewService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if(params['id']){
          this.id = params['id'];
          this.editing = true;
        }
        else{
          this.editing = false;
        }

      });
    if(this.editing){
      this.guestViewService.getGuestById(this.id).subscribe(res => {
          //set variables to show in form
          this.name = res.guest.name;
          this.email= res.guest.email;
          this.phone = res.guest.phone;
          this.eventsAttended = res.guest.eventsAttended;
          this.donationTotal = res.guest.donationTotal;
          this.dietary = res.guest.dietary;
        },
        err => {
          console.log(err);
          return false;
        });
    }
  }

  onAddGuestSubmit() {
    const guest = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      eventsAttended: this.eventsAttended,
      donationTotal: this.donationTotal,
      dietary: this.dietary
    };

    if (!guest.eventsAttended) {
      this.eventsAttended = 0;
    }
    if (!guest.donationTotal){
      guest.donationTotal = 0;
    }
    // Required Field
    if (!ValidateService.validateGuest(guest)) {
      this.flashMessage.show("Fill fields",
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!ValidateService.validateEmail(guest.email)) {
      this.flashMessage.show("Enter a valid email",
        {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register Guest
    if(!this.editing){
      this.authService.registerGuest(guest).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("Guest registered!",
            {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show("Something went wrong",
            {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/add-guest']);
        }
      });
    }
    else{
      this.guestViewService.updateGuest(this.id, guest).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("Guest updated",
            {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show("Something went wrong",
            {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

  }
}
