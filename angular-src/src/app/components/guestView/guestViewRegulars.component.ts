import {Component, OnInit} from '@angular/core';
import {GuestViewService} from '../../services/guestView.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guestViewRegulars',
  templateUrl: './guestViewRegulars.component.html',
  styleUrls: ['./guestViewRegulars.component.css']
})
export class GuestViewRegularsComponent implements OnInit {
  gList: Object;

  constructor(private guestViewService: GuestViewService, private router: Router) {
  }

  ngOnInit() {

    this.guestViewService.getRegulars().subscribe(profile => {
        this.gList = profile.gList;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
