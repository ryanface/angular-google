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
  private userSelected:any;


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
  open_logs(user:any):void{
      console.log('user',user);
      this.userSelected = user;
      //let mail:string = 'naiara.rodrigues@mail.fae.edu';
      console.log('get_logs',user);
      //'naiara.rodrigues@mail.fae.edu'
      this.AppService.json(user.profile.emailAddress).subscribe((response: Response) => { this.process(response.json()); } );

      let html = '<div class="panel panel-default"><div class="panel-footer"><ul class="list-group">loading...</ul></div></div>';
      this.modal = new tingle.modal({
          footer: true,
          stickyFooter: false,
          cssClass: ['modal'],
          onOpen: function() {
              console.log('modal open');
          },
          onClose: function() {
              console.log('modal closed');
          }
      });
      this.modal.setContent(html);
      this.modal.open();
  }
  process(lista:any):void{
      console.log('logs',lista);
      let html = '<li class="list-group-item"><img src="'+this.userSelected.profile.photoUrl+'" width="5%"> '+this.userSelected.profile.name.fullName+' <small class="shortname" style="float: right;margin-top: 10px">'+this.userSelected.profile.emailAddress+'</small></li>';
      let html2 = '';
      let line:any = {};
      for(let lines in lista){
        for(let work in lista[lines].Rows){
            line = lista[lines].Rows[work];
            html2 += '<li class="list-group-item">Id:'+line.indice+','+line.status+','+line.date+','+line.msg+'</li>';
        }
        html2 += '<li class="list-group-item">Total de logs:'+lista[lines].TotalRows+'</li>';
      }

      html = (html2 == '') ? '<li class="list-group-item">nenhuma log</li>':html;
      this.modal.close();
      this.modal.setContent('<div class="panel panel-default"><div class="panel-footer"><ul class="list-group">'+html+'</ul><ul class="list-group">'+html2+'</ul></div></div>');
      this.modal.open();
  }
}
