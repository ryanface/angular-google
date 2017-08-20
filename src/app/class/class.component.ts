import { Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from "../app.service";
import { List } from '../list.type';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {

  LIST:Response;
  msg:Response;

  subscription: Subscription;
  subscription1: Subscription;

  constructor( private AppService: AppService ) {
  }

  ngOnInit() {
     this.AppService.google();
     this.subscription = this.AppService.getService().subscribe((lista: Response) => this.LIST = lista);

     this.subscription1 = this.AppService.pesquisarGiphy().subscribe((response: Response) => this.msg = response.json().data);
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
      this.subscription1.unsubscribe();
  }
  atualizar(){
    console.log('service:',this.LIST,this.msg );
  }
}
