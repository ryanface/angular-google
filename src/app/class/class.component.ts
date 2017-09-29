import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";
import { GlobalDataService } from '../globaldata.service';
import { List } from '../list.type';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {

  LISTx:any[] = [];
  _COURSES:any[] = [];
  subscription: Subscription;
  spinner:any = {'class':'spinner','msg':'.'};
  term:string;

  constructor( private AppService: AppService,
               private gd:GlobalDataService,
               private route: Router ) {
  }

  ngOnInit() {
      this.AppService.goRooms();
      this.subscription = this.AppService.getRooms().subscribe((lista: Response) => { this.proccess(lista);  },(error) => { console.log(error); } );
  }
  ngOnDestroy() {
      if(this.subscription)this.subscription.unsubscribe();
      this.AppService.clearRooms();
  }
  proccess(tmp:Response){
     console.log('proccess',tmp);
     if(tmp){
         let _fields = ['Id','Sala','Código'];
         for(let i in tmp){
            let folder = (tmp[i].teacherFolder)?tmp[i].teacherFolder.alternateLink:'';
            this.LISTx.push([tmp[i].id,tmp[i].name,tmp[i].descriptionHeading,tmp[i].alternateLink,folder]);
         }
         this._COURSES = this.LISTx;

         this.subscription.unsubscribe();
         this.AppService.clearRooms();
         this.clear();
     }
  }
  clear(){
     console.log('clear');
     this.spinner.msg = '';
  }
  pesquisar(){
      console.log(this.term);
      let tmp:any[] = [];
      for(let i in this.LISTx){
         if(this.LISTx[i][2] == undefined) this.LISTx[i][2] = '';
         if((this.LISTx[i][1].toUpperCase().indexOf(this.term.toUpperCase()) != -1) || (this.LISTx[i][2].toUpperCase().indexOf(this.term.toUpperCase()) != -1))
           tmp.push(this.LISTx[i]);
      }
      this._COURSES = tmp;
  }
}
