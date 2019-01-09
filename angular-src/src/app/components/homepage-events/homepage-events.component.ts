import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../services/events.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage-events',
  templateUrl: './homepage-events.component.html',
  styleUrls: ['./homepage-events.component.css']
})
export class HomepageEventsComponent implements OnInit {

  eventList: Object;

  constructor(private router: Router,
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

}
