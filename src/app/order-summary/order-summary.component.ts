import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription }   from 'rxjs/Subscription';

import { OrderService } from '../services/order.service'

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  items: any[] = []
  subscription: Subscription;
  orderCount: number = 0

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.subscription = orderService.itemAdded$.subscribe(
      item => {
        this.orderCount++
        var ordered = false;
        for (let orderItem of this.items) {
          if (orderItem._id == item._id) {
            orderItem.qty++
            ordered = true
          }
        }
        if (!ordered) {
          item.qty = 1;
          this.items.push(item)
        }
      }
    )
    this.items = this.orderService.items
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  removeItem(item: any) {
    this.items = this.items.filter((orderItem) => {
      if (orderItem._id != item._id)
        return orderItem
      else
        // this.orderService.orderCount - orderItem.qty
        this.orderCount = this.orderCount - orderItem.qty
    })
    this.orderService.removeItem(this.orderCount)
  }

  getTotal() {
    return this.items
      .reduce((sum, value) => sum + (value.price * value.qty), 0);
  }

  placeOrder() {
    this.orderService.placeOrder(this.items)
    this.router.navigate(['place-order'])
  }

}
