import {Component, OnInit} from '@angular/core';
import {RefreshListService} from "../../services/refresh-list.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RefreshListService]
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
