import { Component, OnInit } from '@angular/core';
import { Dog } from '../core/models/dog.model';
import { DogService } from '../core/services/dog.service';
import { Filter } from '../core/models/filter.model';
import { WsService } from '../core/services/ws.service';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
  mapView: any = { show: false };
  lat = 32.0852999;
  lng = 34.78176759999999;
  zoom = 11;
  editDialogWidth = '425px';
  constructor(
    private dogService: DogService,
    private wsService: WsService,
    public editDialog: MatDialog,
    private route: ActivatedRoute,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('adopt-dog',
      sanitizer.bypassSecurityTrustResourceUrl('assets/dog.svg'))
  }

  ngOnInit() {
    this.route.data.subscribe((data: { dogs: Dog[] }) => {
      this.dogs = data.dogs;
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
          if (dog.isAdopted === true) {
            this.findOneAndRemove(dog)
          } else {
            this.findOneAndUpdate(dog)
          }

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

  adopted(dog: Dog) {
    this.dogService.adopted(dog).subscribe(sucess => {
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
      width: this.editDialogWidth,
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
      width: this.editDialogWidth,
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
