import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../core/services/statistics.service';
import { WsService } from '../core/services/ws.service';
import { count } from 'rxjs/operators';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  hitCount: number
  lastClient: any
  numberOfConnectedClients: Number

  constructor(private statisticService: StatisticsService,
    private wsService: WsService) {
  }

  ngOnInit() {
    this.statisticService.getHitCount().subscribe(res => {
      this.hitCount = res.hitCount;
    })

    this.statisticService.getLastClient().subscribe(res => {
      this.lastClient = res.lastClient;
    })

    this.statisticService.getNumberOfConnectedClients().subscribe(res => {
      this.numberOfConnectedClients = res.numberOfConnectedClients;
    })

    this.wsService.notifyNumberOfConnectedClientsChanged().subscribe(
      count => {
        if (count > this.numberOfConnectedClients) {
          this.hitCount++;
        }
        this.numberOfConnectedClients = count
      },
      err => {
        console.error(err);
      }
    )
  }

}
