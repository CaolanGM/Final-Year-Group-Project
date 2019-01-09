import {Injectable} from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() {
  }

  static validateRegister(user) {
    if (user.name === undefined
      || user.email === undefined
      || user.username === undefined
      || user.password === undefined
      || user.password2 === undefined) {
      return false;
    } else {
      return true;
    }
  }

  static validateGuest(guest) {
    if (guest.name == undefined || guest.email == undefined || guest.phone == undefined) {
      return false;
    } else {
      return true;
    }
  }

  static validateMenu(event) {
    if (event.id == undefined) {
      return false;
    } else {
      return true;
    }
  }

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
