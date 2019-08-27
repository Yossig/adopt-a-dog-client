import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { GraphComponent } from './graph/graph.component';
import { MatGridListModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [StatisticsComponent, GraphComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class StatisticsModule { }
