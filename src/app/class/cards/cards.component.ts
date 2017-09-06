import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'cards-list',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  Google_Drive_icon = './assets/Google_Drive_icon.png';
  Google_Classroom_icon = './assets/Google_Classroom_icon.png';

  @Input()
  json: any[] = [];
  @Input()
  fields: any[] = [];
  @Output()
  sendRequest = new EventEmitter<any>();
  @Output()
  currentHerolocal = new EventEmitter<any>();

  activities(activity:any){
        console.log('activity:',activity);
        this.currentHerolocal = activity.id;
        this.sendRequest.emit(activity);
  }

  constructor() { }

  ngOnInit() {
  }

}
