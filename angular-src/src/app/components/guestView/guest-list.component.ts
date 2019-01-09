import {Component, Input, OnInit} from '@angular/core';
import {GuestSearchCriteria, GuestViewService} from "../../services/guestView.service";
import {RefreshListService} from "../../services/refresh-list.service";
import {AttendantService} from '../../services/attendant.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from '@angular/router';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {

  constructor(private guestViewService: GuestViewService,
              private refreshListService: RefreshListService,
              private flashMessage: FlashMessagesService,
            private attendantService: AttendantService,
            private router: Router) {
    refreshListService.refreshAnnounced$.subscribe(() => {
      this.refresh()
    })
  }

  @Input() eventName: String;
  gList: Object;
  event: Object;

  ngOnInit() {
    this.getGuests({sortColumn: 'name', sortDirection: 'asc'});
  }

  onSorted($event) {
    this.getGuests($event);
  }

  refresh() {
    this.getGuests({sortColumn: 'name', sortDirection: 'asc'});
  }

  getGuests(criteria: GuestSearchCriteria) {
    this.guestViewService.getGuestsForEvent(this.eventName).subscribe(guests => {
        this.event = guests.event;
        this.gList = guests.gList.sort((a, b) => {
          if (criteria.sortDirection === 'desc') {
            return a[criteria.sortColumn] < b[criteria.sortColumn];
          }
          else {
            return a[criteria.sortColumn] > b[criteria.sortColumn];
          }
        });
      },
      err => {
        console.log(err);
        return false;
      });
  }



  rsvpGuest() {
    let checks = document.getElementsByName('checks');
    for (let i = 0; i < checks.length; i++) {
      if ((<HTMLInputElement>checks[i]).checked === true) {
        const attendee = (<HTMLInputElement>checks[i]).value
        this.attendantService.updateRSVP(attendee).subscribe(data => {
          if (data.success) {
            this.flashMessage.show("Guest RSVP'd",
              {cssClass: 'alert-success', timeout: 3000});
            this.announceRefresh()
          } else {
            this.flashMessage.show(data.msg,
              {cssClass: 'alert-danger', timeout: 3000});
          }
        });
      }
    }
  }


  addDonation(){

    var checks = document.getElementsByName('checks');

    var amount = 0;


    var amounts = document.getElementsByName('amount');
    for (var i = 0; i < amounts.length; i++) {

        if ((<HTMLInputElement>amounts[i]).value != ""){

          amount = parseInt((<HTMLInputElement>amounts[i]).value);
          (<HTMLInputElement>amounts[i]).value="";
        }

    }


    if(amount < 0){
      this.flashMessage.show("Negative donations not permitted",
        {cssClass: 'alert-danger', timeout: 3000});
    }
    else{
      for (var i = 0; i < checks.length; i++) {
        if ((<HTMLInputElement>checks[i]).checked === true) {
          const attendee = (<HTMLInputElement>checks[i]).value;
          this.attendantService.addDonation(attendee,amount).subscribe(data => {
            if (data.success) {
              this.flashMessage.show("Donation Added",
                {cssClass: 'alert-success', timeout: 3000});
              this.announceRefresh()
            } else {
              this.flashMessage.show(data.msg,
                {cssClass: 'alert-danger', timeout: 3000});
            }
          });
        }
      }
    }




  }

  emailCaterer(){

      var checks = document.getElementsByName('checks');
      var catererEmails = document.getElementsByName('catererEmail');
      var catererEmail;
      for (var i = 0; i < catererEmails.length; i++) {

        if ((<HTMLInputElement>catererEmails[i]).value != ""){

          catererEmail = (<HTMLInputElement>catererEmails[i]).value;
          (<HTMLInputElement>catererEmails[i]).value="";
        }

      }

      var attendees = []
      for (var i = 0; i < checks.length; i++) {
         if ((<HTMLInputElement>checks[i]).checked === true) {
             attendees.push((<HTMLInputElement>checks[i]).value);
             (<HTMLInputElement>checks[i]).checked = false;
         }
      }
      if(attendees.length == 0){
          console.log("no one selected")
          this.flashMessage.show("Please select the dietary requirements you would like to send",
            {cssClass: 'alert-danger', timeout: 3000});
      }
      else if(catererEmail == ""){
          console.log("no email entered for caterer")
          this.flashMessage.show("Please enter caterer's email address",
            {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
          this.attendantService.emailCaterer(attendees, catererEmail).subscribe(data => {
              if (data.success) {
                  this.flashMessage.show("Emailed Dietary Requirements to " + catererEmail,
                  {cssClass: 'alert-success', timeout: 3000});
                  this.announceRefresh()
              } else {
                  this.flashMessage.show(data.msg,
                      {cssClass: 'alert-danger', timeout: 3000});
              }
          });
      }
  }

  announceRefresh() {
    this.refreshListService.refresh();
  }
}
