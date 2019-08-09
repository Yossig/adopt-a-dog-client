import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { ApiService } from '../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatGridListModule, MatDividerModule } from '@angular/material';
import { DogService } from '../core/services/dog.service';


@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule
  ],
  providers:[],
  bootstrap: [ExploreComponent]
})
export class ExploreModule { }
