import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog.model';

@Injectable()
export class DogService {
  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Dog[]> {
    return this.apiService.get('dog');
  }
}