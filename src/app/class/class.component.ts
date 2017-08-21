import { Component, OnInit, NgModule } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";
import { List } from '../list.type';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {

  LISTx:any[] = [];
  _COURSES:any[] = [];
  _fields:any[] = [];
  _AUTENTICATE:boolean = false;
  subscription: Subscription;
  spinner:string = 'spinner';
  time:any;
  count:number = 0;
  term:string;

  constructor( private AppService: AppService ) {
  }

  ngOnInit() {
      this.subscription = this.AppService.getService().subscribe((lista: Response) => this.proccess(lista),(error) => console.log(error), );
      this.AppService.google();
      this.time = setInterval(()=>this.atualizar(),2000);
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  proccess(tmp:Response){
     console.log('proccess',tmp);
     this._fields = ['Id','Sala','Código'];
     for(let i in tmp) this.LISTx.push([tmp[i].id,tmp[i].name,tmp[i].descriptionHeading]);
     this._COURSES = this.LISTx;
     this.atualizar();
  }
  atualizar(){
    console.log('service:',this.LISTx);
    if((this.count >= 1) || (this.AppService._LOGIN == false)) this.clear();
    if(this.LISTx[1] != undefined) this.count++;
    if(this.AppService._LOGIN == false) this.autenticate();
  }
  autenticate(){
      //this._AUTENTICATE = false;
      this.AppService.login();
  }
  logout(){      
      this.AppService.logout();
  }
  clear(){
     console.log('clear');
     this.spinner = '';
     clearInterval(this.time);
  }
  pesquisar(){
      console.log(this.term);
      let tmp:any[] = [];
      for(let i in this.LISTx){
         if((this.LISTx[i][1].toUpperCase().indexOf(this.term.toUpperCase()) != -1) || (this.LISTx[i][2].toUpperCase().indexOf(this.term.toUpperCase()) != -1))
           tmp.push(this.LISTx[i]);
      }
      this._COURSES = tmp;
  }
}
