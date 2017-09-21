declare var tingle: any;
declare var jQuery:any;
declare var $: any;

import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
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

  public Google_Activity_icon = './assets/Google_Activity_icon.png';
  public Google_Question_icon = './assets/Google_Question_icon.png';
  public Google_Tarefa_icon   = './assets/Google_Tarefa_icon.png';
  public Google_Answer_icon   = './assets/Google_Answer_icon.png';

  public term:string;

  private modal:any;
  private answers:any[] = [];
  private subscription: Subscription;
  private List:ListCourseWork[] = [];
  /*enrols*/
  private enrols: Subscription;
  private enrolsList:any;

  @Input()
    json: any = [];
  @Input()
    _AUTENTICATE: boolean = false;
  @Input()
    spinner:any = {'class':'spinner','msg':'.'};
  @Input()
    courseId:number;

  constructor(private AppService: AppService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
  }
  activities(courseWork:number){
      console.log('click:activities');
      this.List = [];
      this.List.push(new ListCourseWork(this.json['courseWork'][0].courseId, courseWork));

      if(this.enrolsList)
        this.getActivities();
      else
        this.get_enrol(this.json['courseWork'][0].courseId);
  }
  getActivities(){
      this.AppService.goActivities(this.List);
      this.subscription = this.AppService.getActivities().subscribe((lista: Response) => { this.process(lista);  },(error) => console.log(error), );
  }
  process(lista:any):void{
      console.log('answer',lista);
      console.log('enrols',this.enrolsList);
      let html = '';
      this.answers = [];
      for(let work in lista){
        this.answers[lista[work].id] = lista[work];
            let grade = lista[work].assignedGrade;
            let usersList = '';
            switch(lista[work].courseWorkType){
              case 'ASSIGNMENT':
                if(lista[work].assignmentSubmission!= undefined){
                  if(lista[work].assignmentSubmission.attachments != undefined){
                     let attachments = lista[work].assignmentSubmission.attachments;
                     usersList += '<img src="'+this.enrolsList[lista[work].userId].photoUrl+'" width="10%">';
                    for(let i in attachments){
                       if(attachments[i].driveFile != undefined)
                          usersList += '<img src="'+attachments[i].driveFile.thumbnailUrl+'" width="10%"><a href="'+attachments[i].driveFile.alternateLink+'" target="_blank"> Arquivo:'+attachments[i].driveFile.title+'</a>';
                    }
                    html += '<li class="list-group-item">'+usersList+' - <a href="'+lista[work].alternateLink+'" target="_blank">Nota</a></li>';
                  }
                }
              break;
              case 'MULTIPLE_CHOICE_QUESTION':
                if(lista[work].multipleChoiceSubmission!= undefined){
                  if(lista[work].multipleChoiceSubmission.answer != undefined){
                     let answer = lista[work].multipleChoiceSubmission;
                     usersList += '<img src="'+this.enrolsList[lista[work].userId].photoUrl+'" width="10%">';
                     usersList += 'Resposta:'+answer.answer;
                     html += '<li class="list-group-item">'+usersList+' - <a href="'+lista[work].alternateLink+'" target="_blank">Nota</a></li>';
                  }
                }
              break;
              case 'SHORT_ANSWER_QUESTION':
                if(lista[work].shortAnswerSubmission!= undefined){
                  if(lista[work].shortAnswerSubmission.answer != undefined){
                     let answer = lista[work].shortAnswerSubmission;
                     usersList += '<img src="'+this.enrolsList[lista[work].userId].photoUrl+'" width="10%">';
                     usersList += 'Resposta:'+answer.answer;
                     html += '<li class="list-group-item">'+usersList+' - <a href="'+lista[work].alternateLink+'" target="_blank">Nota</a></li>';
                  }
                }
              break;
            }
      }
      html = (html == '') ? '<li class="list-group-item">nenhuma entrega</li>':html;

      this.subscription.unsubscribe();
      this.AppService.clearActivities();
      this.modal.close();
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
  /*enrols list*/
  get_enrol(courseId:number):void{
    this.AppService.goEnrols(courseId);
    this.enrols = this.AppService.getEnrols().subscribe((lista: Response) => { this.process_enrol(lista);  },(error) => console.log(error), );
  }
  process_enrol(lista:any):void{
    let tmp:any[] = [];
    for(let i in lista){
       tmp[lista[i].userId] = lista[i].profile;
    }
    this.enrolsList = tmp;

    this.getActivities();
    this.enrols.unsubscribe();
    this.AppService.clearEnrols();
  }

}
