import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OrderService } from '../services/order.service'
import { OrderFormComponent } from '../order-form/order-form.component'

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  @ViewChild(OrderFormComponent) private orderFormComponent: OrderFormComponent;

  items: any[] = []

  constructor(
    private orderService: OrderService,
    private location: Location
  ) {
    this.items = this.orderService.items
  }

  ngOnInit() {
  }

  decQty(item: any) {
    this.items[this.items.indexOf(item)].qty--
    if (this.items[this.items.indexOf(item)].qty == 0) {
      this.items.splice(this.items.indexOf(item), 1)
    }
    // (+item.qty)--
  }

  incQty(item: any) {
    this.items[this.items.indexOf(item)].qty++
    //(+item.qty)++
  }

  getItemCount() {
    if (this.items) { // for testing
      return this.items.length
    } else {
      return 2
    }
  }

  getTotalPrice() {
    if (this.items) { // for testing
      var total = 0;
      for (let item of this.items) {
        total = total + item.price * item.qty
      }
      return total
    } else {
      return 11.25
    }
  }

  goBack() {
    this.location.back()
  }

  placeOrder() {
    var valid = this.orderFormComponent.validateInfo()
    if (valid) {
      console.log('submitting form...')
    }
  }

}
