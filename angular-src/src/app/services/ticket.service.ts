import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class TicketService {

  constructor(private http: Http) {
  }

  addTickets(payload) {
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/tickets/add',
      payload).map(res => res.json());
  }

  getTickets(guest_id, event_id) {
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    let payload = {guest_id: guest_id, event_id: event_id};
    return this.http.post(
      'http://localhost:3000/api/tickets/get',
      payload).map(res => res.json());
  }
}
