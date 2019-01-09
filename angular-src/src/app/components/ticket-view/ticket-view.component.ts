import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Observable} from "rxjs/Observable";
import {GuestViewService} from "../../services/guestView.service";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  event_id: Observable<string>;
  guest_id: Observable<string>;
  event: any;
  guest: any;
  tickets: any;

  constructor(private eventsService: EventsService,
              private guestService: GuestViewService,
              private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessagesService) {
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
    this.ticketService.getTickets(this.guest_id, this.event_id).subscribe(res => {
        //set variables to show in form
        this.tickets = res.tickets;
      },
      err => {
        console.log(err);
        return false;
      })
  }
}
