import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { DogService } from './services/dog.service';

@NgModule({
  imports:[
    CommonModule
  ],
  providers:[
    ApiService,
    DogService
  ]
})
export class CoreModule{}