import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventsService} from "../../services/events.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  eventList: Object;

  constructor(private router: Router,
              private flashMessage: FlashMessagesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getAllEvents().subscribe(response => {
        this.eventList = response.eventList;
      },
      err => {
        console.log(err);
        return false;
      });
  }
  downloadMenu(path) {
      path = path.substring(7);
      var newWindow = window.open('http://localhost:3000' + path);
  }
}
