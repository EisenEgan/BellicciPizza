import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'rxjs/add/operator/switchMap';
import { Subscription }   from 'rxjs/Subscription';

import { MenuService } from '../services/menu.service'
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
  // providers: [OrderService]
})
export class UserMenuComponent implements OnInit {

  location: Object
  sortedItems: Object[]

  menuState: String = 'out';
  orderQty: number = 0;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private orderService: OrderService
  ) {
    this.route.params
      .switchMap((params: Params) => this.menuService.getLocationInfo(params['location']))
      .subscribe(data => {
        this.location = data.location
        this.sortedItems = data.sortedItems
        // console.log(this.location)
        // console.log('sortedItems')
        // console.log(this.sortedItems)
      });
    this.subscription = orderService.itemRemoved$.subscribe(
      newQty => {
        this.orderQty = newQty
      });
    this.orderQty = this.orderService.items.length
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  toggleOrder() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  addItemToOrder(product: Object) {
    this.orderQty++;
    this.orderService.addItem(product)
  }

}
