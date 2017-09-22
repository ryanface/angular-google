declare var tingle: any;
import { Component, OnInit, Input, Output } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  Google_Drive_icon     = './assets/Google_Drive_icon.png';
  Google_Classroom_icon = './assets/Google_Classroom_icon.png';
  Google_Activity_icon  = './assets/Google_Activity_icon.png';
  Google_Group_icon     = './assets/Google_Group_icon.ico';
  Google_Close_icon     = './assets/Google_Close_icon.ico';
  Google_Log_icon       = './assets/Google_Log_icon.png';

  /*enrols*/
  private modal:any;
  private enrols: Subscription;

  public UserList:any[] = [];
  public Users:any[] = [];
  public term:string;
  public timer:any;
  public timeout:number = 0;
  private activate:boolean = false;


  @Input()
    json: any;
  @Input()
    _AUTENTICATE: boolean = false;
  @Input()
    spinner:any = {'class':'spinner','msg':'.'};
  @Input()
    courseId:number;

  constructor( private AppService: AppService ) { }

  ngOnInit() {
  }
  /*enrols list*/
  open_modal():void{
      console.log('courseId',this.courseId);
      //this.process_enrol(courseWork);
      this.timer = setInterval(()=>this.atualiza(),1000);
      this.start();
  }
  atualiza(){
     this.timeout++;
    if(this.timeout >= 5){
        clearInterval(this.timer);
        this.timeout = 0;
    }
  }
  start():void{
    if(this.UserList[0]){
        this.Users = this.UserList;
    }else{
        this.AppService.goEnrols(this.courseId);
        this.enrols = this.AppService.getEnrols().subscribe((lista: Response) => { this.process_enrol(lista);  },(error) => console.log(error), );
    }
    this.activate = true;
  }
  process_enrol(lista:any):void{
      console.log('enrols',lista);
      this.UserList = [];
      for(let work in lista){
         this.UserList.push(lista[work]);
      }
      this.Users = this.UserList;
      this.enrols.unsubscribe();
      this.AppService.clearEnrols();
  }
  close(){
      this.activate = false;
  }
  pesquisar(){
      console.log(this.term);
      let tmp:any[] = [];
      for(let i in this.UserList){
         if((this.UserList[i].profile.name.fullName.toUpperCase().indexOf(this.term.toUpperCase()) != -1) || (this.UserList[i].profile.emailAddress.toUpperCase().indexOf(this.term.toUpperCase()) != -1))
           tmp.push(this.UserList[i]);
      }
      this.Users = tmp;
  }
  get_logs(user:any){
      //let mail:string = 'naiara.rodrigues@mail.fae.edu';
      let mail:string = user.profile.emailAddress;
      console.log('get_logs',user);
      this.AppService.json(mail).subscribe((response: Response) => { console.log(response.json()); } );
  }


}
