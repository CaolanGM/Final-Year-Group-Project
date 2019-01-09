import {Component, OnInit} from '@angular/core';
import {GuestViewService} from '../../services/guestView.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guestViewBigSpenders',
  templateUrl: './guestViewBigSpenders.component.html',
  styleUrls: ['./guestViewBigSpenders.component.css']
})
export class GuestViewBigSpendersComponent implements OnInit {
  gList: Object;

  constructor(private guestViewService: GuestViewService, private router: Router) {
  }

  ngOnInit() {

    this.guestViewService.getBigSpenders().subscribe(profile => {
        this.gList = profile.gList;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
