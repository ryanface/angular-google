import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";

@Component({
  selector: 'activity-details-list',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
    id: number;
    private sub: any;

    LISTx:any;
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

  constructor(private route: ActivatedRoute, private AppService: AppService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.id = +params['id']; this.go(); });

  }
  ngOnDestroy() {
     this.sub.unsubscribe();
   }

   go():void{
     this.AppService.google('activity',{id:this.id});
     this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
     this.time = setInterval(()=>this.atualizar(),2000);
   }
   //AUTENTICACAO __  LOAD COURSES
   proccess(tmp:Response){
      console.log('proccess',tmp);
      this._AUTENTICATE = true;
      this.LISTx = tmp;
      this._COURSES = this.LISTx;
      this.atualizar();
   }
   atualizar(){
     this.timeout++;
     console.log('service:',this.timeout,this.LISTx);
     if(this.count >= 1 && this._AUTENTICATE) this.clear();
     if(this.LISTx != undefined) this.count++;
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

}
