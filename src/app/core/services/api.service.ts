import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): any {
    return this.http.get(path, { params });
  }
}