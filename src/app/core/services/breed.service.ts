import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Breed } from '../models/breed.model';

@Injectable()
export class BreedService {
  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Breed[]> {
    return this.apiService.get('/breed');
  }
}