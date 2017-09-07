import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  Google_Question_icon = './assets/Google_Question_icon.png';
  Google_Tarefa_icon = './assets/Google_Tarefa_icon.png';

  @Input()
  json: any[] = [];
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
