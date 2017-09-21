declare var tingle: any;

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../../app.service";
import { Subscription } from 'rxjs/Subscription';
import { ListCourseWork } from '../../listCourseWork.type';

@Component({
  selector: 'cards-list',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  Google_Drive_icon = './assets/Google_Drive_icon.png';
  Google_Classroom_icon = './assets/Google_Classroom_icon.png';
  Google_Activity_icon = './assets/Google_Activity_icon.png';
  Google_Group_icon = './assets/Google_Group_icon.ico';

  private term:string;
  private modal:any;
  private answers:any[] = [];
  private subscription: Subscription;
  private List:ListCourseWork[] = [];

  @Input()
  json: any[] = [];

  constructor(private AppService: AppService) { }

  ngOnInit() {
  }

  enrols(courseId:number){
      console.log('click:activities');
      this.AppService.goEnrols(courseId);
      this.subscription = this.AppService.getEnrols().subscribe((lista: Response) => { this.process(lista);  },(error) => console.log(error), );
  }
  process(lista:any):void{
      console.log('enrols',lista);
      let html = '';
      for(let work in lista){
         let user = lista[work];
         html += '<li class="list-group-item"><img src="'+user.profile.photoUrl+'" width="5%"> '+user.profile.name.fullName+' <small class="shortname" style="float: right;margin-top: 15px">'+user.profile.emailAddress+'</small></li>';
      }
      html = (html == '') ? '<li class="list-group-item">nenhuma aluno</li>':html;

      this.subscription.unsubscribe();
      this.AppService.clearActivities();
      this.modal.close();
      this.modal.setContent('<div class="panel panel-default"><div class="panel-footer"><ul class="list-group">'+html+'</ul></div></div>');
      this.modal.open();
  }
  open_modal(courseWork:number):void{
      console.log('courseWork',courseWork);
      this.enrols(courseWork);
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
  pesquisar(){

  }



}
