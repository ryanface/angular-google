import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassRoutingModule } from "./class-routing.module";
import { ClassComponent } from './class.component';
import { AppService } from "../app.service";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClassRoutingModule,
    FilterListModule
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
