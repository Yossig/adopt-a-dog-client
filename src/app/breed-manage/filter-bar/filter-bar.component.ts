import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  @Input() origins: string[]

  constructor() { }

  ngOnInit() {
  }

}
