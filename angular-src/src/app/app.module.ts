import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';
import {GuestViewComponent} from './components/guestView/guestView.component';
import {GuestViewRegularsComponent} from './components/guestView/guestViewRegulars.component';
import {GuestViewBigSpendersComponent} from './components/guestView/guestViewBigSpenders.component';
import {EmailComponent} from './components/email/email.component';
import {EventFormComponent} from './components/event-form/event-form.component';
import {SortableColumnComponent} from "./components/sortable-column/sortable-column.component";
import {SortableTableDirective} from "./components/sortable-column/sortable-table-directive.directive";
import {EventListComponent} from "./components/event-list/event-list.component";
import {GuestListComponent} from "./components/guestView/guest-list.component";
import {AddGuestComponent} from './components/add-guest/add-guest.component';
import {UploadMenuComponent} from './components/upload-menu/upload-menu.component';


import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {GuestViewService} from './services/guestView.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SortService} from "./services/sort-service.service";
import {EmailService} from './services/email.service';
import {AuthGuard} from './guards/auth.guard';
import {EventsService} from "./services/events.service";
import {AttendantService} from "./services/attendant.service";
import {TicketService} from "./services/ticket.service";
import {HomepageEventsComponent} from "./components/homepage-events/homepage-events.component";
import {PublicEventComponent} from "./components/public-event/public-event.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";
import {TicketViewComponent} from "./components/ticket-view/ticket-view.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'email', component: EmailComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'guestView', component: GuestViewComponent, canActivate: [AuthGuard]},
  {path: 'guestViewRegulars', component: GuestViewRegularsComponent, canActivate: [AuthGuard]},
  {path: 'guestViewBigSpenders', component: GuestViewBigSpendersComponent, canActivate: [AuthGuard]},
  {path: 'add-guest', component: AddGuestComponent, canActivate: [AuthGuard]},
  {path: 'add-event', component: EventFormComponent, canActivate: [AuthGuard]},
  {path: 'upload-menu', component: UploadMenuComponent, canActivate: [AuthGuard]},
  {path: 'public-event', component: PublicEventComponent},
  {path: 'buy-ticket', component: TicketDetailsComponent},
  {path: 'view-ticket', component: TicketViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    GuestViewComponent,
    GuestViewRegularsComponent,
    GuestViewBigSpendersComponent,
    EmailComponent,
    AddGuestComponent,
    EventFormComponent,
    SortableColumnComponent,
    SortableTableDirective,
    EventListComponent,
    GuestListComponent,
    HomepageEventsComponent,
    PublicEventComponent,
    FileSelectDirective,
    UploadMenuComponent,
    TicketDetailsComponent,
    TicketViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    NgbModule.forRoot()
  ],
  providers: [ValidateService, AuthService, TicketService, EmailService, AuthGuard, GuestViewService, SortService, EventsService, AttendantService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
