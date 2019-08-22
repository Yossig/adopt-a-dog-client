import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class StatisticsService {
  constructor(private apiService: ApiService) { }

  getUserCount(): Observable<any> {
    return this.apiService.get('/statistics/userCount');
  }

  getLastClient(): Observable<any> {
    return this.apiService.get('/statistics/lastClient');
  }

  queryCountMinSketch(key): Observable<any> {
    return this.apiService.post('/statistics/cms/', { key: key })
  }
}