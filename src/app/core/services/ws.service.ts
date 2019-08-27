import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Observable } from 'rxjs';
import { Dog } from '../models/dog.model';


@Injectable()

export class WsService {
  socket$: WebSocketSubject<any>
  constructor() {
    this.socket$ = webSocket("ws://localhost:3001")

  }

  notifyDogRemoved(): Observable<Dog> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "dogRemoved") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyDogAdded(): Observable<Dog> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "dogAdded") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyDogUpdated(): Observable<Dog> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "dogUpdated") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyNumberOfConnectedClientsChanged(): Observable<number> {
    return new Observable(subscriber=> {
      this.socket$.subscribe(
        msg=> {
          if (msg.action === "NumberOfConnectedClientsChanged") {
            subscriber.next(msg.data);
          }
        }
      )
    })
  }

}