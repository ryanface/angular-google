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

  public Google_Answer_icon    = './assets/Google_Answer_icon.png';
  public Google_Tarefa_icon    = './assets/Google_Tarefa_icon.png';
  public Google_Open_icon      = './assets/Google_Open_icon.png';
  public Google_Classroom_icon = './assets/Google_Classroom_icon.png';

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
    spinner:any = {'class':'spinner','msg':'.'};
  @Input()
    courseId:number;

  constructor( private AppService: AppService ) { }

  ngOnInit() {
  }
  pesquisar(){

  }
}
