import { Component, OnInit } from '@angular/core';
import { Dog } from '../core/models/dog.model';
import { DogService } from '../core/services/dog.service';
import { Filter } from '../core/models/filter.model';
import { WsService } from '../core/services/ws.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  dogs: Dog[];
  constructor(
    private dogService: DogService,
    private wsService: WsService

  ) { }

  ngOnInit() {

    this.dogService.getAll().subscribe((data: Dog[]) => {
      this.dogs = data;
    })

    this.wsService.notifyDogRemoved()
      .subscribe(
        (dog) => {
          this.findOneAndRemove(dog)
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      );
  }

  filter(filter: Filter) {
    this.dogService.filter(filter).subscribe((data: Dog[]) => {
      this.dogs = data;
    })
  }

  remove(dog: Dog) {
    this.dogService.remove(dog).subscribe(success => {
      this.findOneAndRemove(dog)
    })
  }

  findOneAndRemove(dog: Dog) {
    let index = this.dogs.map(it => {
      return it._id
    }).indexOf(dog._id);

    if (index !== -1) {
      this.dogs.splice(index, 1);
    }
  }
}
