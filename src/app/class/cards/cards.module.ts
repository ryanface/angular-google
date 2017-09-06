import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "./cards.component";
import { CardsRoutingModule } from "./cards-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CardsRoutingModule,
  ],
  declarations: [ CardsComponent ],
  exports: [ CardsComponent ]
})
export class CardsModule { }
