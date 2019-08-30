import { Component, OnInit, ViewChild } from '@angular/core';
import { Breed } from '../core/models/breed.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreedService } from '../core/services/breed.service';

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

  constructor(private route: ActivatedRoute, private breedService:BreedService) { }

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

}
