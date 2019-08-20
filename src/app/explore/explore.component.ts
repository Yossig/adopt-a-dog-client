import { Component, OnInit } from '@angular/core';
import { Dog } from '../core/models/dog.model';
import { DogService } from '../core/services/dog.service';
import { Filter } from '../core/models/filter.model';
import { WsService } from '../core/services/ws.service';
import { MatDialog } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class ExploreComponent implements OnInit {

  dogs: Dog[];
  constructor(
    private dogService: DogService,
    private wsService: WsService,
    public editDialog: MatDialog

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

    this.wsService.notifyDogAdded()
      .subscribe(
        (dog) => {
          this.add(dog)
        },
        (err) => console.error(err),
        () => console.warn('Completed!'))

    this.wsService.notifyDogUpdated()
      .subscribe(
        (dog) => {
          this.findOneAndUpdate(dog)
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      )
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

  add(dog: Dog) {
    let index = this.dogs.map(it => {
      return it._id
    }).indexOf(dog._id);

    if (index === -1) {
      this.dogs.push(dog);
    }
  }

  findOneAndRemove(dog: Dog) {
    let index = this.dogs.map(it => {
      return it._id
    }).indexOf(dog._id);

    if (index !== -1) {
      this.dogs.splice(index, 1);
    }
  }

  findOneAndUpdate(dog: Dog) {
    let index = this.dogs.map(it => {
      return it._id
    }).indexOf(dog._id);

    if (index !== -1) {
      this.dogs[index] = dog
    }
  }

  openAddDialog() {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: new Dog()
    })

    dialogRef.afterClosed().subscribe(newDog => {
      if (newDog) {
        this.dogService.add(newDog).subscribe(result => {
          this.add(result);
        })
      }
    })
  }

  openEditDialog(dog: Dog) {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: { ...dog }
    })

    dialogRef.afterClosed().subscribe(updatedDog => {
      if (updatedDog) {
        this.dogService.update(updatedDog).subscribe(result => {
          this.findOneAndUpdate(result);
        })
      }
    })
  }
}
