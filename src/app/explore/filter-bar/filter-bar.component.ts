import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Filter } from 'src/app/core/models/filter.model';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: Filter;

  @Output() filterRequest = new EventEmitter<Filter>();

  constructor() { }

  ngOnInit() {
    this.filter = {
      genders: [],
      minAge: 0
    }
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }
}
