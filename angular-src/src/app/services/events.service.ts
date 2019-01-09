import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {
  event: any;
  authToken: any;
  id: string;

  constructor(private http: Http) {
  }

  addEvent(event) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/events/add',
      event,
      {headers: headers}).map(res => res.json());
  }

  updateEvent(eventId, event) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.post(
      'http://localhost:3000/api/events/add/' + eventId,
      event,
      {headers: headers}).map(res => res.json());
  }

  getAllEvents() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get(
      'http://localhost:3000/api/events/getAll',
      {headers: headers}).map(res => res.json());
  }

  getEventById(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    myParams.append('_id', id);
    let options = new RequestOptions({headers: headers, params: myParams});
    return this.http.get(
      'http://localhost:3000/api/events/getById/' + id,
      options = options).map(res => res.json());
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
