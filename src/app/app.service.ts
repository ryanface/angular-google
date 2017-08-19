declare var require: any;
var configuration = require('../configuration');
//import configuration  from '../configuration.json';

import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
declare var gapi: any;

@Injectable()
export class AppService implements OnInit {
    public PROJECT_ID:string = configuration.PROJECT_ID;
    public CLIENT_ID:string  = configuration.CLIENT_ID;
    public API_SECRET:string = configuration.API_SECRET;
    public API_KEY:string    = configuration.API_KEY;
    public SCOPES: any[]=configuration.SCOPES;
    public DISCOVERY_DOCS: any[] = configuration.DISCOVERY_DOCS;
    public API_VERSION:string = 'v1';

    public COURSE_LIST:any[];
    public LIST:any[];

    listChange: Subject<any> = new Subject<any>();

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
          this.list();
          //gapi.auth2.getAuthInstance().signIn();
          //gapi.auth2.getAuthInstance().signOut();
        }else  console.log('não logou;');
    }
    list(): void {
        gapi.client.classroom.courses.list({
          pageSize: 10
        }).then(response => { console.log(response.result.courses);console.log(this.listChange); this.listChange.next(response.result.courses); });
    }

    //-------------- MOODLE -----------------------
    json(source: string, params:any): Observable<Response> {
      params['wstoken'] = configuration.wstoken;
      params['wsfunction'] = source;
      const url = configuration.url;
      //console.log(params);
      //const url = 'http://moodle.net:8080/webservice/rest/server.php?wstoken=bc1efa077b17a3a5808f888254b800b7&wsfunction='+source+'&moodlewsrestformat=json';
      return this.http.get(url,{params:params});
    }
}
