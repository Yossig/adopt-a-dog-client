import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../core/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  hitCount : number
  lastClient: any

  constructor(private statisticService : StatisticsService) { }

  ngOnInit() {
    this.statisticService.getHitCount().subscribe(res => {
      this.hitCount = res.hitCount;
    })
  }

}
