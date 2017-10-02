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

  public Google_Answer_icon   = './assets/Google_Answer_icon.png';
  public Google_Log_icon      = './assets/Google_Log_icon.png';

  /*enrols*/
  public term:string;
  private userSelected:any;
  private modal:any;

  @Input()
    json: any;
  @Input()
    spinner:any = {'class':'spinner','msg':'.'};
  @Input()
    courseId:number;

  constructor( private AppService: AppService ) { }

  ngOnInit() {
  }
  /*LOGS*/
  open_logs(user:any):void{
      console.log('user',user);
      this.userSelected = user;
      //let mail:string = 'naiara.rodrigues@mail.fae.edu';
      console.log('get_logs',user);
      //'naiara.rodrigues@mail.fae.edu'
      this.AppService.json(user.emailAddress).subscribe((response: Response) => { this.process(response.json()); } );

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
      let html = '<li class="list-group-item"><img src="'+this.userSelected.photoUrl+'" width="5%"> '+this.userSelected.name.fullName+' <small class="shortname" style="float: right;margin-top: 10px">'+this.userSelected.emailAddress+'</small></li>';
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
