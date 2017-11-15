import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  delivery: boolean = true

  submitted: boolean = false

  orderInfo = {
    deliveryOrPickUp: this.delivery ? "delivery" : "pickup",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: ""
  }

  constructor() { }

  ngOnInit() {
  }

  validateInfo() {

  }


}
