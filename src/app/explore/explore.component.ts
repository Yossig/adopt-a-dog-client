import { Component, OnInit } from '@angular/core';
import { Dog } from '../core/models/dog.model';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  dogs: Dog[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.get('dog').subscribe((data:Dog[]) => {
      this.dogs = data;
    })
  }

}
