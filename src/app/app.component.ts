import { OnInit, OnDestroy,Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentChoice: string = "";
  private time:any;
  public count:number = 0;
  public currentId:string = '0';

  constructor(private router: Router, private AppService: AppService) {
    router.events.subscribe((url:any) => this.follow(url));
    this.time = setInterval(()=>this.atualizar(),500);
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }
  public atualizar(){
     this.count++;
     if(this.count > 10){
         //clearInterval(this.time);
         this.count = 0;
     }
  }
  follow(url:any){
     if(url.shouldActivate) console.log('follow',url);
     if(url.shouldActivate){
        let tmp:string = url.url;
        let tmp1:string[] = tmp.split('/');
        this.currentId = tmp1[2];
        setTimeout(()=>this.setActive(tmp1[1]),500);
     }
  }
  setActive(choice: string): void{
      console.log('current menu',choice);
      this.currentChoice = choice;
  }
  getActive(choice: string) : string{
      if(this.currentChoice == choice)
           return "active";
      else
           return undefined;
  }
  logout(){
      this.AppService.logout();
  }
}
