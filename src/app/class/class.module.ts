import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoutingModule } from "./class-routing.module";
import { ClassComponent } from './class.component';
import { AppService } from "../app.service";

@NgModule({
  imports: [
    CommonModule,
    ClassRoutingModule
  ],
  declarations: [
    ClassComponent
  ],
  exports:[
    ClassComponent
  ],
  providers: [ AppService ],
})
export class ClassModule { }
