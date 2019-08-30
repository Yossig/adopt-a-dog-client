import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedManageRoutingModule } from './breed-manage-routing.module';
import { BreedManageComponent } from './breed-manage.component';


@NgModule({
  declarations: [BreedManageComponent],
  imports: [
    CommonModule,
    BreedManageRoutingModule
  ]
})
export class BreedManageModule { }
