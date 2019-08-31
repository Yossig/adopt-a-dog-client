import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Breed } from '../models/breed.model';

@Injectable()
export class BreedService {
  baseUrl: string
  constructor(
    private apiService: ApiService
  ) {
    this.baseUrl = '/api/breed/'
  }

  getAll(): Observable<Breed[]> {
    return this.apiService.get(this.baseUrl);
  }

  filter(filter): Observable<Breed[]> {
    return this.apiService.post(this.baseUrl + 'filter', filter)
  }

  add(breed): Observable<Breed> {
    return this.apiService.post(this.baseUrl, breed);
  }

  update(breed): Observable<Breed> {
    return this.apiService.put(this.baseUrl, breed)
  }

  remove(breed): Observable<any> {
    return this.apiService.delete(this.baseUrl + breed._id)
  }
}