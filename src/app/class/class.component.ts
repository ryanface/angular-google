import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  COURSES: any[] = [];

  constructor( private AppService: AppService ) {

  }

  ngOnInit() {
     this.AppService.google();

     this.AppService.listChange.subscribe((list) => {
        this.COURSES = [];
        for (let i = 0; i < list.length; i++) {
          console.log(list[i].name);
           this.COURSES.push(list[i].name);
        }
     });
  }
  ngOnDestroy() {
      this.AppService.listChange.unsubscribe();
  }

}
