import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardStudentsComponent } from './card-students.component';

@NgModule({
    imports:[
      RouterModule.forRoot([
        { path: 'card-students/:id', component: CardStudentsComponent },
     ])
    ],
    exports:[
      RouterModule
    ]

})

export class CardStudentsRoutingModule{}
