import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../app.service";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  COURSES: any[] = [];
  LIST: any[] = ['11','22'];

  constructor( private AppService: AppService ) {
     this.AppService.listChange.subscribe((list) => {  for(let i in list) this.COURSES.push(list[i].name); setTimeout(()=> { console.log('insta'); this.atualizar();},1000); });
  }

  ngOnInit() {
     this.AppService.google();

     //this.AppService.listChange.subscribe((response: Response) => {  console.info(response); this.COURSES = response.json(); });

  }
  ngOnDestroy() {
      //this.AppService.listChange.unsubscribe();
  }
  atualizar(){
      this.LIST = this.COURSES;
  }

}
