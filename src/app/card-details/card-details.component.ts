import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";

@Component({
  selector: 'card-details-list',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

    /*observer*/
    private subscription: Subscription;
    //private Announcement: Subscription;

    public id: number;
    private sub: any;
    LISTx:any;
    _COURSES:any[] = [];
    spinner:any = {'class':'spinner','msg':'.'};
    term:string;

  constructor(private route: ActivatedRoute, private AppService: AppService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.id = +params['id']; this.go(); });
    this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
    //this.Announcement = this.AppService.getAnnouncement().subscribe((lista: Response) => { console.log(lista); this.Announcement.unsubscribe();  },(error) => { console.log(error); } );
  }
  ngOnDestroy() {
     if(this.sub)this.sub.unsubscribe();
     this.AppService.clearService();
     //if(this.Announcement)this.Announcement.unsubscribe();
   }
   go():void{
     this.AppService.getCardDetail(this.id);
     //this.AppService.goAnnouncement(this.id);
   }
   //AUTENTICACAO __  LOAD COURSES
   proccess(tmp:Response){
      console.log('proccess',tmp);
      this.LISTx = tmp;
      this._COURSES = this.LISTx;

      this.subscription.unsubscribe();
      this.AppService.clearService();
      this.clear();
   }
   clear(){
      console.log('clear');
      this.spinner.msg = '';
   }
}
