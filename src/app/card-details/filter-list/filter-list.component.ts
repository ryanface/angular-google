import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
  json: any;
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
