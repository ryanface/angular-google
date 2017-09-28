import { OnInit, OnDestroy,Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentChoice: string = "";

  constructor(private router: Router) {
    router.events.subscribe((url:any) => this.follow(url));
    //console.log(router.url);  // to print only path eg:"/login"
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }

  follow(url:any){
     //console.log('follow',url);
     if(url.shouldActivate){
        let tmp:string = url.url;
        let tmp1:string[] = tmp.split('/');
        this.setActive(tmp1[1]);
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
           return "not";
  }
}
