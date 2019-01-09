import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../services/email.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  subject: String;
  body: String;
  mailingList: Object;
  eventList: Object;

  constructor(private emailService: EmailService,
              private flashMessage: FlashMessagesService,
              private eventsService: EventsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getEvents();
  }

  onEmailSubmit() {
    const email = {
      subject: this.subject,
      body: this.body,
      mailingList: this.mailingList
    };
    
    this.emailService.send(email).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Email Sent!',
          {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        console.log('failure!');
      }

    });
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
