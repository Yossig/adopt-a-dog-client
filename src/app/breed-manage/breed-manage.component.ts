import { Component, OnInit, ViewChild } from '@angular/core';
import { Breed } from '../core/models/breed.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreedService } from '../core/services/breed.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-breed-manage',
  templateUrl: './breed-manage.component.html',
  styleUrls: ['./breed-manage.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})
export class BreedManageComponent implements OnInit {

  dataSource: any;
  origins: string[];
  displayedColumns: string[] = ['Breed', 'Origin', 'Image', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private breedService: BreedService,
    public editDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { breeds: Breed[] }) => {
      this.dataSource = new MatTableDataSource<Breed>(data.breeds);
      this.dataSource.paginator = this.paginator;
      this.origins = data.breeds.map(breed => breed.Origin).filter((value, index, self) => self.indexOf(value) === index).sort()
    })

  }

  filter(filter: any) {
    this.breedService.filter(filter).subscribe((data: Breed[]) => {
      this.dataSource = new MatTableDataSource<Breed>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  remove(breed) {
    this.breedService.remove(breed).subscribe(success => {
      let index = this.find(breed);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  add(breed) {
    this.breedService.add(breed).subscribe((data: Breed) => {
      this.dataSource.data.push(data);
      this.dataSource._updateChangeSubscription();
    })
  }

  update(breed) {
    this.breedService.update(breed).subscribe((data: Breed) => {
      let index = this.find(data)
      if (this.find(data) !== -1) {
        this.dataSource.data[index] = data;
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  find(breed) {
    return this.dataSource.data.map(it => {
      return it._id
    }).indexOf(breed._id);
  }


  openAddDialog() {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: { breed: new Breed(), origins: this.origins }
    })

    dialogRef.afterClosed().subscribe(newBreed => {
      if (newBreed) {
        this.add(newBreed)
      }
    })
  }

  openEditDialog(breed) {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: { breed: {...breed}, origins: this.origins }
    })

    dialogRef.afterClosed().subscribe(updatedBreed => {
      if (updatedBreed) {
        this.update(updatedBreed)
      }
    })
  }

}
