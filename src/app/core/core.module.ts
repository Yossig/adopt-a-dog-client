import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { DogService } from './services/dog.service';
import { BreedService } from './services/breed.service';
import { WsService } from './services/ws.service';
import { StatisticsService } from './services/statistics.service';

@NgModule({
  imports:[
    CommonModule
  ],
  providers:[
    ApiService,
    DogService,
    BreedService,
    WsService,
    StatisticsService
  ]
})
export class CoreModule{}