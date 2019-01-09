import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Observable} from "rxjs/Observable";
import {GuestViewService} from "../../services/guestView.service";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  event_id: Observable<string>;
  guest_id: Observable<string>;
  event: any;
  guest: any;

  ticket_count: Number;
  table;
  dietary_preferences;
  extra_comments;

  constructor(private eventsService: EventsService,
              private guestService: GuestViewService,
              private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessagesService) {
    this.ticket_count = 0;
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.event_id = params['event'];
        this.guest_id = params['guest'];
      });
    this.eventsService.getEventById(this.event_id).subscribe(res => {
        //set variables to show in form
        this.event = res.event;
      },
      err => {
        console.log(err);
        return false;
      });
    this.guestService.getGuestById(this.guest_id).subscribe(res => {
        //set variables to show in form
        this.guest = res.guest;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onTicketSubmit() {
    console.log('buying a ticket');
    const payload = {
      ticket_count: this.ticket_count,
      table: this.table,
      dietary_preferences: this.dietary_preferences,
      extra_comments: this.extra_comments,
      guest_id: this.guest_id,
      event_id: this.event_id,
      email: this.guest.email,
      event_name: this.event.name
    };
    this.ticketService.addTickets(payload).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Tickets created",
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show("Something went wrong, please try again later.",
          {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }


}
