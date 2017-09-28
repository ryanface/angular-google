import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";
import { GlobalDataService } from '../globaldata.service';
import { List } from '../list.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  AUTENTICATE:boolean = false;
  subscription: Subscription;
  spinner:any = {'class':'spinner','msg':''};
  private time:any;
  public count:number = 0;

  constructor( private AppService: AppService,
               private gd:GlobalDataService,
               private route: Router ) {
                 this.time = setInterval(()=>this.atualizar(),1000);
  }


  ngOnInit() {
      this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
      //this.AppService.checkLogin();

  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
      clearInterval(this.time);
  }
  public atualizar(){
     this.count++;
     console.log('AUTENTICATE',this.count,this.AUTENTICATE);
     if(this.count > 10){
         //clearInterval(this.time);
         this.count = 0;
     }
  }
  //AUTENTICACAO __  LOAD COURSES
  proccess(tmp:Response){
     console.log('proccess',tmp);
     if(tmp['api']){
         console.log("api",tmp);
         this.spinner.class = '';
         this.spinner.msg = 'Erro ao logar, verifique as permissões de Pop-up.';
     }else{
         this.AUTENTICATE = true;
         //clearInterval(this.time);
         this.route.navigate(['dashboard']);
     }
  }
  autenticate(){
       this.AppService.login();
  }
  logout(){
      this.AppService.logout();
      this.AUTENTICATE = false;
  }
  clear(){
     console.log('clear');
     this.spinner.msg = '';
  }

}
