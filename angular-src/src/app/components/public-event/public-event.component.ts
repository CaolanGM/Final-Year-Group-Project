import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {Observable} from "rxjs/Observable";
import {interval} from "rxjs/observable/interval";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-public-event',
  templateUrl: './public-event.component.html',
  styleUrls: ['./public-event.component.css'],
})
export class PublicEventComponent implements OnInit {

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
  money_raised: Number;
  new_total: Number;
  menu: String;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private eventsService: EventsService) { }

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
    this.eventsService.getEventById(this.id).subscribe(res => {
        //set variables to show
        this.name = res.event.name;
        this.description = res.event.description;
        this.event_type = res.event.event_type;
        this.location = res.event.location;
        this.seat_count = res.event.seat_count;
        this.table_count = res.event.table_count;
        this.date = res.event.date;
        this.capacity = res.event.capacity;
        this.money_raised = res.event.donationTotal;
        this.menu = res.event.menuPath;
      },
      err => {
        console.log(err);
        return false;
      });
    const everySecond = interval(1000);
    everySecond.subscribe(money_raised =>
      this.eventsService.getEventById(this.id).subscribe(res => {
        this.new_total = res.event.donationTotal;
        if(this.money_raised != this.new_total){
          let diff = +this.new_total - +this.money_raised;
          this.flashMessage.show("Donation of $" + diff  + " Added ",
            {cssClass: 'alert-success', timeout: 10000});
        }
        this.money_raised = res.event.donationTotal;
      })
    )
  }
    downloadMenu() {
      if (this.menu != 'No menu yet!') {
        var path = this.menu.substring(7);
        var newWindow = window.open('http://localhost:3000/' + path);
      }
      else {
        this.flashMessage.show("No menu set yet",
          {cssClass: 'alert-danger', timeout: 3000});
      }
  }
}


