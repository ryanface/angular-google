import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";


@Component({
  selector: 'activity-details-list',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
    id: number;
    private sub: any;

    LISTx:any;
    _COURSES:any[] = [];
    _fields:any[] = [];

    subscription: Subscription;
    spinner:any = {'class':'spinner','msg':'.'};
    term:string;

  constructor(private route: ActivatedRoute, private AppService: AppService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.id = +params['id']; this.go(); });
    this.subscription = this.AppService.getService().subscribe((lista: Response) => { this.proccess(lista);  },(error) => console.log(error), );
  }
  ngOnDestroy() {
     if(this.sub)this.sub.unsubscribe();
     if(this.subscription)this.subscription.unsubscribe();
     this.AppService.clearService();
   }
   go():void{
     this.AppService.getActivityDetail(this.id);
   }
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
