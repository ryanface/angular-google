import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingRoutingModule } from "./loading-routing.module";
import { LoadingComponent } from './loading.component';
import { AppService } from "../app.service";

@NgModule({
  imports: [
    CommonModule,
    LoadingRoutingModule
  ],
  declarations: [
    LoadingComponent
  ],
  exports:[
    LoadingComponent
  ],
  providers: [ AppService ],
})
export class LoadingModule { }
