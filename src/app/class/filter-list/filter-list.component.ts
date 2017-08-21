import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
  json: any[] = [];
  @Input()
  fields: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
