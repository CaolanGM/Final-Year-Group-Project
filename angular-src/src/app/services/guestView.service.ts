import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {tokenNotExpired} from 'angular2-jwt'

@Injectable()
export class GuestViewService {

  authToken: any;

  constructor(private http: Http) {
  }

  getGuests(){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get(
      'http://localhost:3000/api/guests/guest',
      {headers: headers}).map(res => res.json());
  }


  getGuestsForEvent(event) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    myParams.append('name', event.name);
    let options = new RequestOptions({ headers: headers, params: myParams });
    return this.http.get(
      'http://localhost:3000/api/events/guests/'+ event,
      options=options).map(res => res.json());
  }

  getGuestById(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    myParams.append('_id', id);
    let options = new RequestOptions({ headers: headers, params: myParams });
    return this.http.get(
      'http://localhost:3000/api/guests/getById/'+ id,
      options=options).map(res => res.json());
  }

  updateGuest(guestId, guest){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/guests/add/'+guestId,
      guest,
      {headers: headers}).map(res => res.json());
  }

  addGuestsToEvent(attendee){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/attendances/add',
      attendee,
      {headers: headers}).map(res => res.json());
  }

  getRegulars() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get(
      'http://localhost:3000/api/guests/regulars',
      {headers: headers}).map(res => res.json());
  }

  getBigSpenders() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get(
      'http://localhost:3000/api/guests/bigspenders',
      {headers: headers}).map(res => res.json());
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}

export class Attendance {
  rsvp: Boolean;
  invited: Boolean;
  ticket_amount: Number;
  tickets: [Object];
  event: [Object];
  guest: Guest;
}

export class Guest {
  name: string;
  phone: string;
  email: string;
  eventsAttended: Number;
  donationTotal: Number;
  dietary: string;
}

export class GuestSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
