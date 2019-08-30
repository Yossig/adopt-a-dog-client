import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: any;
  @Input() origins: string[];
  @Output() filterRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.filter = {
      origins: []
    }
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }

}
