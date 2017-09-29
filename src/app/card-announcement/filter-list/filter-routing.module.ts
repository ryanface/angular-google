import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

export class FilterRoutingModule{}
