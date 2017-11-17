import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'rxjs/add/operator/switchMap';
import { Subscription }   from 'rxjs/Subscription';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  pizza: any

  menuState: String = 'out';
  orderQty: number = 0;

  subscription: Subscription;

  showDialog: boolean = false;

  customPizzaForm: FormGroup
  toppings: any

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.route.params
      .switchMap((params: Params) => this.menuService.getLocationInfo(params['location']))
      .subscribe(data => {
        console.log(data)
        this.location = data.location
        this.sortedItems = data.sortedItems
        this.pizza = data.pizza
        this.toppings = data.pizza.toppings
        console.log(this.toppings)
        // console.log(this.location)
        // console.log('sortedItems')
        // console.log(this.sortedItems)
        // console.log(this.pizza.items[this.pizza.items.findIndex(i => i.size == "Medium")])
        this.customPizzaForm
          .patchValue({
            pizzaSize: this.pizza.pizzaSizes[this.pizza.pizzaSizes.findIndex(i => i.size == "Medium")]
          })
      });
    this.subscription = orderService.itemRemoved$.subscribe(
      newQty => {
        this.orderQty = newQty
      });
    this.orderQty = this.orderService.items.length
  }

  addTopping() {
    const control = <FormArray>this.customPizzaForm.controls['toppings'];
    const addrCtrl = this.initTopping();


    control.push(addrCtrl);
  }

  removeTopping(i: number) {
    const control = <FormArray>this.customPizzaForm.controls['toppings'];
    control.removeAt(i);
  }

  initTopping() {
    return this.fb.group({
      topping: {}
    });
  }

  ngOnInit() {

    // call from ngOnInit
    this.customPizzaForm = this.fb.group({
      pizzaSize: [{}, Validators.required],
      // pizzaSize: this.fb.group(new Item())
      toppings: this.fb.array([])
    });

    this.addTopping()
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

  addPizzaToOrder() {
    var pizza = Object.assign({}, this.customPizzaForm.value.pizzaSize);
    var toppings = []
    var size = pizza.size
    var toppingsArr = this.customPizzaForm.value.toppings.slice(0)
    for (let topping of toppingsArr) {
      if (Object.keys(topping.topping).length !== 0) {
        var newTopping = Object.assign({}, topping.topping)
        switch (size) {
          case ("Small"):
            newTopping.calories = parseInt((newTopping.calories * 0.8).toFixed(0))
            newTopping.price = parseFloat((newTopping.price * 0.8).toFixed(1))
            pizza.calories += parseInt(newTopping.calories.toFixed(0))
            pizza.price = parseFloat((pizza.price + newTopping.price).toFixed(1))
            break;
          case ("Large"):
            newTopping.calories = parseInt((newTopping.calories * 1.2).toFixed(0))
            newTopping.price = parseFloat((newTopping.price * 1.2).toFixed(1))
            pizza.calories += parseInt((newTopping.calories).toFixed(0))
            pizza.price = parseFloat((pizza.price + newTopping.price).toFixed(1))
            break;
          default:
            pizza.calories += newTopping.calories
            pizza.price = parseFloat((pizza.price + newTopping.price).toFixed(1))
        }
        toppings.push(newTopping)
      }
    }
    // console.log('pizzaPrice')
    // console.log(pizza.price)
    // console.log("toppings")
    // console.log(toppings)
    pizza.toppings = toppings
    // console.log(pizza)
    this.orderService.addItem(pizza)

    this.orderQty++
    this.showDialog = !this.showDialog

    this.customPizzaForm = this.fb.group({
      pizzaSize: [{}, Validators.required],
      // pizzaSize: this.fb.group(new Item())
      toppings: this.fb.array([])
    });
    this.addTopping()

    this.customPizzaForm
      .patchValue({
        pizzaSize: this.pizza.pizzaSizes[this.pizza.pizzaSizes.findIndex(i => i.size == "Medium")]
      })
  }

  toppingPrice(topping: any) {
    switch (this.customPizzaForm.value.pizzaSize.size) {
      case ("Small"):
        return topping.price * 0.8
      case ("Large"):
        return topping.price * 1.2
      default:
        return topping.price
    }
  }

  createPizza() {
    this.showDialog = !this.showDialog
  }

}
