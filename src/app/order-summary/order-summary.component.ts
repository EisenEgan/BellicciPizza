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
            if (orderItem.name == 'Custom Pizza') {
              if (orderItem.toppings.length == item.toppings.length) {
                var toppingsDontMatch = false
                orderItem.toppings.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
                item.toppings.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
                for (var i = 0; i < orderItem.toppings.length; i++) {
                  if (item.toppings[i]._id == orderItem.toppings[i]._id) {
                    continue
                  } else {
                    console.log('print unequal')
                    toppingsDontMatch = true
                  }
                }
                if (!toppingsDontMatch) {
                  orderItem.qty++
                  ordered = true
                }
              }
            } else {
              orderItem.qty++
              ordered = true
            }
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
      if (item.name == "Custom Pizza" && orderItem._id == item._id) {
        if (item.toppings.length == orderItem.toppings.length) {
          for (var i = 0; i < item.toppings.length; i++) {
            if (item.toppings[i] != orderItem.toppings[i])
              return orderItem;
          }
        } else {
          return orderItem
        }
      } else {
        if (orderItem._id != item._id)
          return orderItem
        else
          this.orderCount = this.orderCount - orderItem.qty
      }
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
