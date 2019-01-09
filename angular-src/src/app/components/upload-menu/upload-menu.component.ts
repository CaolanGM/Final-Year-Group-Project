import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {EventsService} from '../../services/events.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

let URL = 'http://localhost:3000/api/menus/upload/';
@Component({
  selector: 'app-upload-menu',
  templateUrl: './upload-menu.component.html',
  styleUrls: ['./upload-menu.component.css']
})
export class UploadMenuComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'menu'});
  title = 'Upload a menu.';
  eList: Object;

  ngOnInit() {
     this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
       console.log('ImageUpload:uploaded:', item, status, response);
     };
    this.eventService.getAllEvents().subscribe(events => {
        this.eList = events.eventList;
      },
      err => {
        console.log(err);
        return false;
      });
  }
  constructor(private http: Http,
              private el: ElementRef,
              private flashMessage: FlashMessagesService,
              private eventService: EventsService,
              private router: Router) {}

  upload() {
    let choices = document.getElementById("eventChoice");
    if((<HTMLSelectElement>choices).options[(<HTMLSelectElement>choices).selectedIndex].value != "-1") {
      const chosen = (<HTMLSelectElement>choices).options[(<HTMLSelectElement>choices).selectedIndex].value;
      //URL = 'http://localhost:3000/api/events/menu/' + chosen;

      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#menu');
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();
      if (fileCount > 0) { // a file was selected
        formData.append("menu", inputEl.files.item(0));

        this.http
          .post(URL, formData).map((res: Response) => res.json()).subscribe(
          (data) => {
            if (data.success) {
              let path = data.filePath;
              let newEvent = {
                menuPath: path
              };
              this.eventService.updateEvent(chosen, newEvent).subscribe(data => {
                if (data.success) {
                  this.flashMessage.show("Event updated",
                    {cssClass: 'alert-success', timeout: 3000});
                  this.router.navigate(['/dashboard']);
                } else {
                  this.flashMessage.show("Something went wrong with updating event",
                    {cssClass: 'alert-danger', timeout: 3000});
                }
              });
              this.flashMessage.show("File successfully uploaded",
                {cssClass: 'alert-success', timeout: 3000});

            }
            else {
              this.flashMessage.show("Something went wrong with file upload",
                {cssClass: 'alert-danger', timeout: 3000});
            }
          },
          (error) => alert(error))
      }
    }
    else{
      this.flashMessage.show("Choose an event",
        {cssClass: 'alert-danger', timeout: 3000});
    }

  }
}
