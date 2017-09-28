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

  constructor( private AppService: AppService,
               private gd:GlobalDataService,
               private route: Router ) {
  }


  ngOnInit() {
      this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
      //this.AppService.checkLogin();

  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
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
         setTimeout(()=>this.route.navigate(['/turmas']),50);
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
