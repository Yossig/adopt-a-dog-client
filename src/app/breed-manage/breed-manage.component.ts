import { Component, OnInit, ViewChild } from '@angular/core';
import { Breed } from '../core/models/breed.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-breed-manage',
  templateUrl: './breed-manage.component.html',
  styleUrls: ['./breed-manage.component.css']
})
export class BreedManageComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['Breed','Origin','Image'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { breeds: Breed[] }) => {
      this.dataSource = new MatTableDataSource<Breed>(data.breeds);
      this.dataSource.paginator = this.paginator;
    })
  }

}
