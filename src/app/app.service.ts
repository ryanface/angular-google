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
    public PROJECT_ID:string = configuration.PROJECT_ID;
    public CLIENT_ID:string  = configuration.CLIENT_ID;
    public API_SECRET:string = configuration.API_SECRET;
    public API_KEY:string    = configuration.API_KEY;
    public SCOPES: any[]=configuration.SCOPES;
    public DISCOVERY_DOCS: any[] = configuration.DISCOVERY_DOCS;
    public API_VERSION:string = 'v1';

    private subject = new Subject<Response>();

    _LOGIN:boolean = false;

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    google(): void {
        console.log('google');
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
          console.log('ok, carregou;');
          gapi.client.classroom.courses.list({
            pageSize: 10
          }).then(response=> { this._LOGIN = true; this.sendService( response.result.courses );  });
          //gapi.auth2.getAuthInstance().signIn();
          //gapi.auth2.getAuthInstance().signOut();
        }else{
           this._LOGIN = false;
           console.log('não logou;');
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

    //-------------- MOODLE -----------------------
    json(source: string, params:any): Observable<Response> {
      params['wstoken'] = configuration.wstoken;
      params['wsfunction'] = configuration.source;
      const url = configuration.url;
      return this.http.get(url,{params:params});
    }
}
