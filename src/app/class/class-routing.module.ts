import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassComponent } from "./class.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'google', component: ClassComponent },
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class ClassRoutingModule{}
