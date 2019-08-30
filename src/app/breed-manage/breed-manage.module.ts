import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedManageRoutingModule } from './breed-manage-routing.module';
import { BreedManageComponent } from './breed-manage.component';
import { MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FilterBarComponent } from './filter-bar/filter-bar.component';


@NgModule({
  declarations: [BreedManageComponent, FilterBarComponent],
  imports: [
    CommonModule,
    BreedManageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class BreedManageModule { }
