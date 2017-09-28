declare var require: any;
declare var gapi: any;
var configuration = require('../configuration');
//import configuration  from '../configuration.json';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { ListCourseWork } from './listCourseWork.type';
import { List } from './list.type';

@Injectable()
export class AppService implements OnInit {

    private subject = new Subject<Response>();
    private activity = new Subject<Response>();
    private enrols = new Subject<Response>();
    private rooms = new Subject<Response>();

    _LOGIN:boolean = false;
    public params:any;
    public method:string;

    constructor(private http: Http,
                private route: Router) {
        gapi.route = route;
    }

    ngOnInit() {
    }
    /*******************************API/CALLs***********************************/
    //activity-detail
    public getActivityDetail(courseId:number){
      try{
          gapi.client.classroom.courses.courseWork.list({
            courseId: courseId
          }).then(response=> {    gapi.locallib.sendService( response.result );  });
      }catch(e){
          this.google('getActivityDetail',{id:courseId});
      }
    }
    //cand-detail
    public getCardDetail(courseId:number){
      try{
        gapi.client.classroom.courses.get({
          id: courseId
        }).then(response=> {    gapi.locallib.sendService( response.result );  });
      }catch(e){
         this.google('getCardDetail',{id:courseId});
      }
    }

    /*******************************API/MODULES***********************************/
    //--- activity-details / filter-list
    public goActivities(CourseWork:ListCourseWork[]){
        console.log('click:goActivities',CourseWork);
      for(let i in CourseWork){
        gapi.client.classroom.courses.courseWork.studentSubmissions.list({
          courseId: CourseWork[i].courseid,
          courseWorkId:CourseWork[i].courseworkid
        }).then(response=> { console.log('return:goActivities=>'+i);  this.sendActivities( response.result.studentSubmissions );  });
      }
    }
    sendActivities(message: Response) {
        console.log('return:sendActivities',message);
        this.activity.next(message);
    }
    clearActivities() {
        this.activity.next();
    }
    getActivities(): Observable<Response> {
        return this.activity.asObservable();
    }

    //--- class / cards
    public goEnrols(courseId:number){
        console.log('click:goEnrols',courseId);
        gapi.client.classroom.courses.students.list({
           courseId:courseId
        }).then(response=> { console.log('return:goEnrols=>');  this.sendEnrols( response.result.students );  });
    }
    sendEnrols(message: Response) {
        console.log('return:sendEnrols',message);
        this.enrols.next(message);
    }
    clearEnrols() {
        this.enrols.next();
    }
    getEnrols(): Observable<Response> {
        return this.enrols.asObservable();
    }
    //---
    //--- class
    public goRooms(){
        console.log('click:goRooms');
        if(gapi.client == undefined || gapi.client.classroom == undefined || gapi.client.classroom.courses == undefined){
           gapi.route.navigate(['login']);
        }else{
            gapi.client.classroom.courses.list({
              courseStates: 'ACTIVE',
              pageSize: 500
            }).then(response=> { gapi.locallib.sendRooms( response.result.courses );  });
        }
    }
    sendRooms(message: Response) {
        console.log('return:sendRooms',message);
        this.rooms.next(message);
    }
    clearRooms() {
        this.rooms.next();
    }
    getRooms(): Observable<Response> {
        return this.rooms.asObservable();
    }
    //---
    /*******************************API/CLIENT***********************************/
    google(method='list',params={}): void {
        console.log('google',params);
        this.method   = method;
        this.params   = params;
        if(gapi.locallib != undefined){
           this.call();
        }else{
           gapi.locallib = this;
           gapi.load('client:auth2', this.initClient);
        }
    }
    initClient(): void {
          console.log('initClient');
          gapi.client.init({
            discoveryDocs: configuration.discoveryDocs,
            clientId: configuration.clientId,
            scope: configuration.scope
          }).then( () => {
            console.log('initClient . then');
            gapi.auth2.getAuthInstance().isSignedIn.listen(gapi.locallib.updateSigninStatus);
            gapi.locallib.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
    }
    updateSigninStatus(isSignedIn):void {
      console.log('updateSigninStatus');
        if (isSignedIn) {
          console.log('ok, logado;');
          //gapi.locallib.call();
          gapi.locallib.sendService( {'ok':'logado'} );
        }else{
           console.log('não logou;');
           gapi.route.navigate(['login']);
           if(gapi.locallib)
             gapi.locallib.sendService( {api:'login_error'} );
           //gapi.auth2.getAuthInstance().signIn();
        }
    }
    call(){
      console.log('call',gapi.locallib.method,gapi.locallib.params);
      switch(gapi.locallib.method) {
          case 'list':
                gapi.client.classroom.courses.list({
                  courseStates: 'ACTIVE',
                  pageSize: 500
                }).then(response=> { gapi.locallib.sendService( response.result.courses );  });
              break;
          case 'getCardDetail':
                gapi.client.classroom.courses.get({
                  id: gapi.locallib.params.id
                }).then(response=> {    gapi.locallib.sendService( response.result );  });
              break;
          case 'getActivityDetail':
                //console.log(gapi.client.classroom);
                gapi.client.classroom.courses.courseWork.list({
                  courseId: gapi.locallib.params.id
                }).then(response=> {    gapi.locallib.sendService( response.result );  });
              break;
          default:
              break;
      }
    }
    /*----------------------NEW--------------------------*/
    checkLogin():void{
        if(gapi.locallib){
           gapi.locallib.sendService( {'ok':'logado'} );
        }else{
           gapi.route.navigate(['login']);
        }
    }
    login():void{
        gapi.locallib = this;
        gapi.load('client:auth2', this.loginProccess);
    }
    loginProccess():void{
        console.log('loginProccess')
        gapi.client.init({
          discoveryDocs: configuration.discoveryDocs,
          clientId: configuration.clientId,
          scope: configuration.scope
        }).then( () => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(gapi.locallib.loginEnd);
          gapi.locallib.loginStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }
    loginStatus(isSignedIn):void{
        console.log('loginStatus',isSignedIn);
        if(isSignedIn){
          gapi.route.navigate(['dashboard']);
        }else{
          if(gapi.locallib)
            gapi.locallib.sendService( {api:'login_error'} );
            gapi.auth2.getAuthInstance().signIn();
        }
    }
    loginEnd(isSignedIn):void{
        console.log('loginEnd',isSignedIn);
        if(!isSignedIn){

          gapi.route.navigate(['login']);
        }else
          gapi.route.navigate(['dashboard']);
    }
    logout(){
        gapi.auth2.getAuthInstance().signOut();
        //gapi.locallib = undefined;
        //gapi.client = undefined;
    }
    sendService(message: Response) {
        this.subject.next(message);
    }
    clearService() {
        this.subject.next();
    }
    getService(): Observable<Response> {
        return this.subject.asObservable();
    }
    /*******************************API/LOG***********************************/
    json(mail:string): Observable<Response> {
      let params:any = [];
      params['params'] = JSON.stringify({"token":"00948692FF46EDA322EC808B855A7F92234567","restformat":"json","method":"get_log_google","params_method":mail});
      const url = 'http://integrador.franciscanos.net/Api';
      return this.http.get(url,{params:params});
    }
}
