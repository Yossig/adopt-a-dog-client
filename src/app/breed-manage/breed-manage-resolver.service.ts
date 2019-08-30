import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Breed } from '../core/models/breed.model';
import { BreedService } from '../core/services/breed.service';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreedManageResolverService implements Resolve<Breed[]> {

  constructor(private breedService: BreedService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breed[]> | Observable<never> {
    return this.breedService.getAll().pipe(take(1), mergeMap(breeds => {
      if (breeds) {
        return of(breeds)
      } else {
        return EMPTY;
      }
    }))
  }
}
