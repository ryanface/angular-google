import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { CardDetailsComponent } from './card-details/card-details.component';

@NgModule({
    imports:[
      RouterModule.forRoot([
        //{ path: 'card-details/:id', component: CardDetailsComponent },
     ])
    ],
    exports:[
      RouterModule
    ]

})

export class CardsRoutingModule{}
