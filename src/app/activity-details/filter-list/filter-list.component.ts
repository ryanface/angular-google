declare var tingle: any;

import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Response } from '@angular/http';
import { NgSwitch } from '@angular/common';
import { AppService } from "../../app.service";
import { Subscription } from 'rxjs/Subscription';
import { ListCourseWork } from '../../listCourseWork.type';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  Google_Question_icon = './assets/Google_Question_icon.png';
  Google_Tarefa_icon   = './assets/Google_Tarefa_icon.png';
  Google_Answer_icon   = './assets/Google_Answer_icon.png';
  term:string;

  private modal:any;
  private answers:any[] = [];
  private subscription: Subscription;
  private List:ListCourseWork[] = [];

  @Input()
  json: any = [];

  constructor(private AppService: AppService) { }

  ngOnInit() {
  }

  activities(courseWork:number){
      console.log('click:activities');
      /*let li = this.json['courseWork'];
      for(let i in li){
          let tmp = new ListCourseWork(li[i].courseId,li[i].id);
          this.List.push(tmp);
      }
      console.log('activities:',this.List);*/
      this.List.push(new ListCourseWork(this.json['courseWork'][0].courseId, courseWork));
      this.AppService.goActivities(this.List);
      this.subscription = this.AppService.getActivities().subscribe((lista: Response) => { this.process(lista);  },(error) => console.log(error), );
  }
  process(lista:any):void{
      let html = '';
      for(let work in lista){
        this.answers[lista[work].id] = lista[work];
        //if(lista[work].assignedGrade != undefined){
             let grade = lista[work].assignedGrade;
             html += '<li class="list-group-item"><a href="'+lista[work].alternateLink+'" target="_blank">Resposta</a> - '+lista[work].state+': userId('+lista[work].userId+'):'+'grade('+grade+')'+lista[work].courseWorkType+'</li>';
        //}
      }
      console.log('answer',this.answers);
      this.subscription.unsubscribe();
      this.AppService.clearActivities();

      this.modal.setContent('<div class="panel panel-default"><div class="panel-footer"><ul class="list-group">'+html+'</ul></div></div>');
      this.modal.open();
  }
  open_modal(courseWork:number):void{
      console.log('courseWork',courseWork);
      this.activities(courseWork);
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
      if(this.json.courseWork_old == undefined){
        this.json.courseWork_old = this.json.courseWork;
      }
      console.log(this.term);
      this.json.courseWork = this.json.courseWork_old;
      let tmp:any[] = [];
      for(let i in this.json.courseWork){
         if((this.json.courseWork[i].title.toUpperCase().indexOf(this.term.toUpperCase()) != -1))
           tmp.push(this.json.courseWork[i]);
      }
      this.json.courseWork = tmp;
  }


}
