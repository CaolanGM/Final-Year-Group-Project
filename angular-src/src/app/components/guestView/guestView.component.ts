import {Component, OnInit} from '@angular/core';
import {GuestSearchCriteria, GuestViewService} from '../../services/guestView.service';
import {EventsService} from '../../services/events.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {RefreshListService} from "../../services/refresh-list.service";


@Component({
  selector: 'app-guestView',
  templateUrl: './guestView.component.html',
  styleUrls: ['./guestView.component.css']
})
export class GuestViewComponent implements OnInit {
  gList: Object;
  eList: Object;

  constructor(private guestViewService: GuestViewService,
              private eventService: EventsService,
              private flashMessage: FlashMessagesService,
              private refreshListService: RefreshListService,
              private router: Router) {
  }

  ngOnInit() {
    this.getGuests({sortColumn: 'name', sortDirection: 'asc'});

    this.eventService.getAllEvents().subscribe(events => {
        this.eList = events.eventList;
      },
      err => {
        console.log(err);
        return false;
      });
  }


  onSorted($event) {
    this.getGuests($event);
  }


  getValue() {


    var checks = document.getElementsByName('checks');
    //var str = '';
    var choices = document.getElementById("eventChoice");
    var chosen = (<HTMLSelectElement>choices).options[(<HTMLSelectElement>choices).selectedIndex].value;


    for (var i = 0; i < checks.length; i++) {
      if ((<HTMLInputElement>checks[i]).checked === true) {
        const attendee = {
          event: chosen,
          guest: (<HTMLInputElement>checks[i]).value
        };
        (<HTMLInputElement>checks[i]).checked = false;
        this.guestViewService.addGuestsToEvent(attendee).subscribe(data => {
          if (data.success) {
            this.flashMessage.show("Guests added to event",
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

  announceRefresh() {
    this.refreshListService.refresh();
  }

  getGuests(criteria: GuestSearchCriteria) {
    this.guestViewService.getGuests().subscribe(guests => {
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
}
