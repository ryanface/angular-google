declare var tingle: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  /*enrols*/
  private modal:any;
  private enrols: Subscription;

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
  start():void{
    this.AppService.goEnrols(this.courseId);
    this.enrols = this.AppService.getEnrols().subscribe((lista: Response) => { this.process_enrol(lista);  },(error) => console.log(error), );
  }
  process_enrol(lista:any):void{
      console.log('enrols',lista);
      let html = '';
      for(let work in lista){
         let user = lista[work];
         html += '<li class="list-group-item"><img src="'+user.profile.photoUrl+'" width="10%"> '+user.profile.name.fullName+' <small class="shortname" style="float: right;margin-top: 30px">'+user.profile.emailAddress+'</small></li>';
      }
      html = (html == '') ? '<li class="list-group-item">nenhuma aluno</li>':html;

      this.enrols.unsubscribe();
      this.AppService.clearEnrols();
      this.modal.close();
      this.modal.setContent('<div class="panel panel-default"><div class="panel-footer"><ul class="list-group">'+html+'</ul></div></div>');
      this.modal.open();
  }
  open_modal():void{
      console.log('courseId',this.courseId);
      //this.process_enrol(courseWork);
      this.start();
      let html = '<div class="panel panel-default"><div class="panel-footer"><ul class="list-group"></ul></div></div>';
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

}
