import { Injectable } from '@angular/core';
import { DogService } from '../core/services/dog.service';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Dog } from '../core/models/dog.model';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExploreResolverService implements Resolve<Dog[]>{

  constructor(private dogService: DogService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dog[]> | Observable<never> {

    return this.dogService.getAll().pipe(take(1),mergeMap(dogs => {
      if(dogs) {
        return of(dogs);
      } else {
        return EMPTY;
      }
    }))
  }
}
