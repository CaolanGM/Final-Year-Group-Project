import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class RefreshListService {

  // Observable string sources
  private refreshSource = new Subject<string>();

  // Observable string streams
  refreshAnnounced$ = this.refreshSource.asObservable();

  // Service message commands
  refresh() {
    this.refreshSource.next();
  }
}
