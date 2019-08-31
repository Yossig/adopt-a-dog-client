import { Component, OnInit, Input, Inject } from '@angular/core';
import { Breed } from 'src/app/core/models/breed.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  origins: string[];
  breed: Breed;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.breed = data.breed;
    this.origins = data.origins;
  }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
