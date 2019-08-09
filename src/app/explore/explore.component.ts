import { Component, OnInit } from '@angular/core';
import { Dog } from '../core/models/dog.model';
import { DogService } from '../core/services/dog.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  dogs: Dog[];

  constructor(
    private dogService: DogService
  ) { }

  ngOnInit() {
    this.dogService.getAll().subscribe((data:Dog[]) => {
      this.dogs = data;
    })
  }

}
