import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog.model';
import { Filter } from '../models/filter.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DogService {
  baseUrl: string
  constructor(
    private apiService: ApiService
  ) {
    this.baseUrl = '/api/dog/';
  }

  getAll(): Observable<Dog[]> {
    return this.apiService.get('/api/dog/');
  }

  filter(filter: Filter): Observable<Dog[]> {
    return this.apiService.post(this.baseUrl + '/filter/', filter).pipe(map(dogs => {
      dogs.forEach(dog => {
        dog.owner = dog.owner[0]
        dog.breed = dog.breed[0]
      })
      return dogs
    }));
  }

  remove(dog: Dog): Observable<any> {
    return this.apiService.delete(this.baseUrl + dog._id);
  }

  add(dog: Dog): Observable<Dog> {
    return this.apiService.post(this.baseUrl, dog);
  }

  update(dog: Dog): Observable<Dog> {
    return this.apiService.put(this.baseUrl, dog);
  }

  adopted(dog: Dog): Observable<Dog> {
    return this.apiService.put(this.baseUrl+'adopted/', dog);
  }
}