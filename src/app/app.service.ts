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
import { GlobalDataService } from './globaldata.service';

@Injectable()
export class AppService implements OnInit {

    private subject = new Subject<Response>();
    private activity = new Subject<Response>();
    private enrols = new Subject<Response>();
    private rooms = new Subject<Response>();
    private announcement = new Subject<Response>();

    _LOGIN:boolean = false;
    public params:any;
    public method:string;
    public reload:any;

    constructor(private http: Http,
                private route: Router,
                private gd:GlobalDataService) {
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
          this.reload = {'id':courseId,'card':'activity-details'};
          this.checkLogin();
      }
    }
    //cand-detail
    public getCardDetail(courseId:number){
      try{
        gapi.client.classroom.courses.get({
          id: courseId
        }).then(response=> {    gapi.locallib.sendService( response.result );  },
                (error)=> { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50); });
      }catch(e){
         this.reload = {'id':courseId,'card':'card-details'};
         this.checkLogin();
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
        }).then(response=> { console.log('return:goActivities=>'+i);  this.sendActivities( response.result.studentSubmissions );  },
                (error)=> { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50); });
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
        try{
            gapi.client.classroom.courses.students.list({
               courseId:courseId
            }).then(response=> { console.log('return:goEnrols=>');  this.sendEnrols( response.result.students );  },
                    (error)=> { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50); });
        }catch(e){
            this.reload = {'id':courseId,'card':'card-students'};
            setTimeout(()=>gapi.route.navigate(['/login']),50);
        }
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
        try{
            gapi.client.classroom.courses.list({
              courseStates: 'ACTIVE',
              pageSize: 500
            }).then(response=> { gapi.locallib.sendRooms( response.result.courses );  },
                    (error)=> { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50); });
        }catch(e){
          setTimeout(()=>gapi.route.navigate(['/login']),50);
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
    //--- class / cards / announcement
    public goAnnouncement(courseId:number){
      try{
        console.log('click:goAnnouncement',courseId,gapi.client.classroom);
        gapi.client.classroom.courses.announcements.list({
           courseId:courseId
        }).then(response=> { console.log('return:goAnnouncement=>');  this.sendAnnouncement( response.result.announcements );  },
                (error)=> { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50); });
      }catch(e){
        this.reload = {'id':courseId,'card':'card-announcement'};
        setTimeout(()=>gapi.route.navigate(['/login']),50);
      }
    }
    public sendAnnouncement(message: Response) {
        console.log('return:sendAnnouncement',message);
        this.announcement.next(message);
    }
    public clearAnnouncement() {
        this.announcement.next();
    }
    public getAnnouncement(): Observable<Response> {
        return this.announcement.asObservable();
    }
    //---
    /*----------------------NEW--------------------------*/
    checkLogin():void{
        if(gapi.locallib){
           gapi.locallib.sendService( {'ok':'logado'} );
        }else{
           setTimeout(()=>gapi.route.navigate(['/login']),50);
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
                  gapi.locallib.loginStatus(gapi.auth2.getAuthInstance().isSignedIn.get());  },
                (error) => { console.log(error); setTimeout(()=>gapi.route.navigate(['/login']),50);
        } );
    }
    loginStatus(isSignedIn):void{
        console.log('loginStatus',isSignedIn);
        if(isSignedIn){
         if(!gapi.locallib.reload){
           setTimeout(()=>gapi.route.navigate(['/turmas']),50);
         }else{
           console.log('reload',gapi.locallib.reload);
           gapi.locallib.gd.choice(gapi.locallib.reload['card'],{'id':gapi.locallib.reload['id'],'descriptionHeading':'reload'});
           setTimeout(()=>gapi.route.navigate(['/'+gapi.locallib.reload['card'], gapi.locallib.reload['id']]),50);
         }
        }else{
          if(gapi.locallib)
            gapi.locallib.sendService( {api:'login_error'} );
            setTimeout(()=>gapi.auth2.getAuthInstance().signIn(),1000);
        }
    }
    loginEnd(isSignedIn):void{
        console.log('loginEnd',isSignedIn);
        if(!isSignedIn){
          setTimeout(()=>gapi.route.navigate(['/login']),50);
        }else{
          setTimeout(()=>gapi.route.navigate(['/turmas']),50);
        }
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
}
