import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class OrderService {

  items: Object[] = []

  constructor(private http: Http) { }

  // Observable string sources
  private itemAddedSource = new Subject<any>();
  private itemRemovedSource = new Subject<number>();

  // Observable string streams
  itemAdded$ = this.itemAddedSource.asObservable();
  itemRemoved$ = this.itemRemovedSource.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  addItem(item: any) {
    this.itemAddedSource.next(item);
  }

  removeItem(newQty: number) {
    this.itemRemovedSource.next(newQty)
  }

  placeOrder(order: any) {
    return this.http.post('http://localhost:3000/api/order', order)
      .map(res => res.json())
  }

  retrieveOrder() {
    return this.items
  }

  //

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }

}
