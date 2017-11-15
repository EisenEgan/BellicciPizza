import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class OrderService {

  items: Object[] = []

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

  placeOrder(items: Object[]) {
    this.items = items
  }

  retrieveOrder() {
    return this.items
  }

  //

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }

}
