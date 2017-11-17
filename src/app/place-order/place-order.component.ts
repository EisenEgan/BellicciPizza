import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

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
    private location: Location,
    private router: Router
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
    console.log(valid)
    if (valid) {
      var order: any = {}
      console.log(valid)
      order.deliveryOrPickup = valid.deliveryOrPickup
      console.log(order.deliveryOrPickup)
      if (valid.deliveryOrPickup == 'delivery') {
        order.address = {}
        order.firstName = valid.firstName
        order.lastName = valid.lastName
        order.address.address = valid.address
        order.address.city = valid.city
        order.address.zip = valid.zip
      } else {
        order.firstName = valid.firstName
        order.lastName = valid.lastName
      }
      var items = []
      var total = 0
      for (let item of this.items) {
        var itemWithoutQty = Object.assign({}, item);
        var quantity = itemWithoutQty.qty
        delete itemWithoutQty.qty
        for (var i = 0; i < quantity; i++) {
          items.push(itemWithoutQty)
          total += itemWithoutQty.price
        }
      }
      order.items = items
      order.total = total
      console.log(order)
      this.orderService.placeOrder(order).subscribe((data) => {
        if (data.success) {
          this.orderService.items = []
          this.router.navigate([''])
        }
      })
      console.log('submitting form...')
    } else {
      console.log('invalid form')
    }
  }

}
