import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../app.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

   json: any[] = [];

  constructor( private AppService: AppService ) { }

  ngOnInit() {
     //this.AppService.json('core_grades_get_grades',params).subscribe((response: Response) => this.proccess(response.json()));
  }

  public proccess(data:any):void{
      this.json = [];
      var grade = 0.0;
      for(let i in data.items){
        if(Number.isInteger(parseInt(data.items[i].activityid)))
        if(data.items[i].grades[0].str_grade != '-'){
          grade += parseFloat(data.items[i].grades[0].str_grade.replace(",","."));
          this.json.push({'activity':data.items[i].name,'grade':data.items[i].grades[0].str_long_grade});
        }
      }
  }

}
