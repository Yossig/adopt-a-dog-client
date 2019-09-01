import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Filter } from 'src/app/core/models/filter.model';
import { Breed } from 'src/app/core/models/breed.model';
import { BreedService } from 'src/app/core/services/breed.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: Filter;
  breeds: Breed[];
  @Output() filterRequest = new EventEmitter<Filter>();
  @Input() mapView: boolean;
  
  constructor(
    private breedService: BreedService
  ) { }

  ngOnInit() {
    this.filter = {
      genders: [],
      minAge: 0,
      breeds: []
    }

    this.breedService.getAll().subscribe((data: Breed[]) => {
      this.breeds = data;
    })
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }
}
