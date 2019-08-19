import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog.model';
import { Filter } from '../models/filter.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DogService {
  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Dog[]> {
    return this.apiService.get('/dog/');
  }

  filter(filter: Filter): Observable<Dog[]> {
    return this.apiService.post('/dog/', filter).pipe(map(dogs => {
      dogs.forEach(dog => {
        dog.owner = dog.owner[0]
        dog.breed = dog.breed[0]
      })
      return dogs
    }));
  }

  remove(dog: Dog): Observable<any> {
    return this.apiService.delete('/dog/' + dog._id);
  }

  add(dog: Dog): Observable<Dog> {
    return this.apiService.post('/dog/add/', dog);
  }
}