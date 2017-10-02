import { Injectable } from '@angular/core';

interface ShareObj {
  [id: string ]: any;

}

@Injectable()
export class GlobalDataService {
  obj: ShareObj = {};
  nav: any = {};

  public get(key:string):any{
      return (this.nav[key]) ? this.nav[key] : undefined;
  }  
  public proccess(){
      console.log("Global",this.nav,this.obj);
  }
}
