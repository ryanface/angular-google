import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";
import { GlobalDataService } from '../globaldata.service';

@Component({
  selector: 'card-details-students',
  templateUrl: './card-students.component.html',
  styleUrls: ['./card-students.component.css']
})
export class CardStudentsComponent implements OnInit {

    /*observer*/
    private Students: Subscription;
    //public
    public enrolsList:any[] = [];
    public filterList:any[] = [];
    public spinner:any = {'class':'spinner','msg':'.'};
    public term:string;
    public id: number;

  constructor(private route: ActivatedRoute
             ,private gd:GlobalDataService
             ,private AppService: AppService) {
  }

  ngOnInit() {
    this.id  = (!this.gd.get('currentData')) ? undefined : this.gd.get('currentData').id;
    this.AppService.goEnrols(this.id);
    this.Students = this.AppService.getEnrols().subscribe((lista: Response) => { this.process_enrol(lista);  },(error) => console.log(error), );
  }
  ngOnDestroy() {
     if(this.Students)this.Students.unsubscribe();
   }
   process_enrol(lista:any):void{
     for(let i in lista){
        this.enrolsList.push(lista[i].profile);
     }
     this.filterList = this.enrolsList;
     console.log('process_enrol',this.enrolsList);
     this.Students.unsubscribe();
     this.AppService.clearEnrols();
     this.clear();
   }
   pesquisar(){
       console.log(this.term);
       let tmp:any[] = [];
       for(let i in this.enrolsList){
          if(this.enrolsList[i].name.fullName == undefined) this.enrolsList[i].name = {'fullname':''};
          if(this.enrolsList[i].emailAddress == undefined) this.enrolsList[i].emailAddress = '';

          if((this.enrolsList[i].name.fullName.toUpperCase().indexOf(this.term.toUpperCase()) != -1) || (this.enrolsList[i].emailAddress.toUpperCase().indexOf(this.term.toUpperCase()) != -1))
            tmp.push(this.enrolsList[i]);
       }
       this.filterList = tmp;
   }
   clear(){
      console.log('clear');
      this.spinner.msg = '';
   }
}
