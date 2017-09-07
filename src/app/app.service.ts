declare var require: any;
declare var gapi: any;
var configuration = require('../configuration');
//import configuration  from '../configuration.json';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { List } from './list.type';

@Injectable()
export class AppService implements OnInit {

    private subject = new Subject<Response>();

    _LOGIN:boolean = false;
    public params:any;
    public method:string;

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    google(method='list',params={}): void {
        console.log('google',params);
        this.method   = method;
        this.params   = params;
        gapi.locallib = this;
        gapi.load('client:auth2', this.initClient);
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
          gapi.locallib.call();
        }else{
           console.log('não logou;');
           gapi.auth2.getAuthInstance().signIn();
        }
    }
    call(){
      console.log('call',gapi.locallib.method,gapi.locallib.params);
      switch(gapi.locallib.method) {
          case 'list':
                gapi.client.classroom.courses.list({
                  courseStates: 'ACTIVE',
                  pageSize: 5
                }).then(response=> { gapi.locallib.sendService( response.result.courses );  });
              break;
          case 'get':
                gapi.client.classroom.courses.get({
                  id: gapi.locallib.params.id
                }).then(response=> {    gapi.locallib.sendService( response.result );  });
              break;
          case 'activity':
                //console.log(gapi.client.classroom);
                gapi.client.classroom.courses.courseWork.list({
                  courseId: gapi.locallib.params.id
                }).then(response=> {    gapi.locallib.sendService( response.result );  });
              break;
          default:
              break;
      }
    }
    login(){
        gapi.auth2.getAuthInstance().signIn();
    }
    logout(){
        gapi.auth2.getAuthInstance().signOut();
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
