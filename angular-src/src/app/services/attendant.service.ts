import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AttendantService {

  authToken: any;

  constructor(private http: Http) {
  }

  updateRSVP(attID) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/attendances/rsvp/' + attID,
      {headers: headers}).map(res => res.json());

  }
  addDonation(attID, amount){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/attendances/donation/' + attID +'/'+amount,
      {headers: headers}).map(res => res.json());
  }
  addGuestDonation(guestID, amount){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/guests/donation/' + guestID +'/'+amount,
      {headers: headers}).map(res => res.json());
  }
  addEventDonation(eventID, amount){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/events/donation/' + eventID +'/'+amount,
      {headers: headers}).map(res => res.json());
  }

  emailCaterer(attendeeIDs, catererEmail){
      let headers = new Headers();
      var attendeesAndCaterer = {attendees:attendeeIDs, catererEmail:catererEmail}
      for(var i = 0; i < attendeeIDs.length;i++)
        console.log(attendeeIDs[i])
      console.log(catererEmail)
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'Application/json');
      return this.http.post(
        'http://localhost:3000/api/attendances/email',
        attendeesAndCaterer,
        {headers: headers}).map(res => res.json());

  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
