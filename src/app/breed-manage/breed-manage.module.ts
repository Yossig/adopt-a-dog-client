import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedManageRoutingModule } from './breed-manage-routing.module';
import { BreedManageComponent } from './breed-manage.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';


@NgModule({
  declarations: [BreedManageComponent],
  imports: [
    CommonModule,
    BreedManageRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class BreedManageModule { }
