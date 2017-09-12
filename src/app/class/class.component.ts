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
  spinner:any = {'class':'spinner','msg':'.'};
  time:any;
  count:number = 0;
  timeout:number = 0;
  term:string;
  currentHerolocal = '';

  constructor( private AppService: AppService ) {
  }

  ngOnInit() {
      this.AppService.google();
      this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
      this.time = setInterval(()=>this.atualizar(),2000);
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  getActivity(activity:any){
     console.log('getActivity',activity);
  }

  //AUTENTICACAO __  LOAD COURSES
  proccess(tmp:Response){
     console.log('proccess',tmp);
     this._AUTENTICATE = true;
     this._fields = ['Id','Sala','Código'];
     for(let i in tmp){
        let folder = (tmp[i].teacherFolder)?tmp[i].teacherFolder.alternateLink:'';
        this.LISTx.push([tmp[i].id,tmp[i].name,tmp[i].descriptionHeading,tmp[i].alternateLink,folder]);
     }
     this._COURSES = this.LISTx;
     this.atualizar();
  }
  atualizar(){
    this.timeout++;
    console.log('service:',this.timeout,this.time,this.LISTx[0]);
    if(this.count >= 1 && this._AUTENTICATE) this.clear();
    if(this.LISTx[0] != undefined) this.count++;
    if(this.timeout > 10 && !this._AUTENTICATE){
       this.clear();
       this.spinner.class = '';
       this.spinner.msg = 'Erro ao logar, tente novamente!';
    }
  }
  autenticate(){
      this.AppService.login();
  }
  logout(){
      this.AppService.logout();
      this._AUTENTICATE = false;
      this._COURSES = [];
  }
  clear(){
     console.log('clear');
     this.spinner.msg = '';
     this.count = 0;
     this.timeout = 0;
     clearInterval(this.time);
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
