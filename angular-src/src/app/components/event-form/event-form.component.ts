import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  id: Observable<string>;
  editing: boolean;
  name: String;
  description: String;
  event_type: String;
  location: String;
  seat_count: Number;
  table_count: Number;
  date: Date;
  capacity: Number;

  constructor(private eventsService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

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
      this.eventsService.getEventById(this.id).subscribe(res => {
          //set variables to show in form
          this.name = res.event.name;
          this.description = res.event.description;
          this.event_type = res.event.event_type;
          this.location = res.event.location;
          this.seat_count = res.event.seat_count;
          this.table_count = res.event.table_count;
          this.date = res.event.date;
          this.capacity = res.event.capacity;
        },
        err => {
          console.log(err);
          return false;
        });
    }
  }

  onEventSubmit() {
    //make new event
    const newEvent = {
      name: this.name,
      description: this.description,
      event_type: this.event_type,
      location: this.location,
      seat_count: this.seat_count,
      table_count: this.table_count,
      date: this.date,
      capacity: this.capacity
    };

    //adding new event
    if(!this.editing) {
      this.eventsService.addEvent(newEvent).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("Event added",
            {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show("Something went wrong",
            {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
    //update existing event
    else{
      this.eventsService.updateEvent(this.id, newEvent).subscribe(data => {
        if (data.success) {
          this.flashMessage.show("Event updated",
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
