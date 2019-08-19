import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dog } from 'src/app/core/models/dog.model';
import { DogService } from 'src/app/core/services/dog.service';
import { Breed } from 'src/app/core/models/breed.model';
import { BreedService } from 'src/app/core/services/breed.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  dog: Dog;
  breeds: Breed[];

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private breedService: BreedService,
    @Inject(MAT_DIALOG_DATA) public data: Dog
  ) {
    this.dog = data;
  }

  ngOnInit() {
    this.breedService.getAll().subscribe((data: Breed[]) => {
      this.breeds = data;
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  comparer(o1: any, o2:any) {
    return o1._id === o2._id
  }
}
