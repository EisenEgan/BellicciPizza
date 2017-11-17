import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  delivery: boolean = true

  submitted: boolean = false

  orderForm: FormGroup

  // orderInfo = {
  //   deliveryOrPickup: this.delivery ? "delivery" : "Pickup",
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   city: "",
  //   zip: ""
  // }

  // orderForm = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   address: new FormControl(),
  //   city: new FormControl(),
  //   zip: new FormControl(),
  // });

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.orderForm = this.fb.group({
      deliveryOrPickup: "delivery",
      firstName: ["", Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      lastName: ["", Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])],
      address: ["", Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])],
      city: ["", Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])],
      zip: ["", Validators.compose([
        Validators.pattern(/^\d{5}$/),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.orderForm.get('deliveryOrPickup').valueChanges.subscribe((deliveryOrPickup: string) => {
      // console.log(deliveryOrPickup)
      if (deliveryOrPickup == "delivery") {
        this.orderForm.get('address').setValidators([Validators.required, Validators.minLength(4)]);
        this.orderForm.get('city').setValidators([Validators.required, Validators.minLength(4)]);
        this.orderForm.get('zip').setValidators([Validators.required, Validators.pattern(/^\d{5}$/)]);
      }
      if (deliveryOrPickup == "pickup") {
        // this.orderForm.get('address').setValue("")
        this.orderForm.get('address').setValidators(null);
        this.orderForm.get('address').updateValueAndValidity();
        // this.orderForm.get('city').setValue("")
        this.orderForm.get('city').setValidators(null);
        this.orderForm.get('city').updateValueAndValidity();
        // this.orderForm.get('zip').setValue("")
        this.orderForm.get('zip').setValidators(null);
        this.orderForm.get('zip').updateValueAndValidity();
      }
    })
  }

  get firstName() { return this.orderForm.get('firstName'); }
  get lastName() { return this.orderForm.get('lastName'); }
  get address() { return this.orderForm.get('address'); }
  get city() { return this.orderForm.get('city'); }
  get zip() { return this.orderForm.get('zip'); }

  validateInfo() {
    if (this.orderForm.status == 'VALID') {
      // Submit
      return this.orderForm.value
    } else {
      this.submitted = true
      return false
    }
  }

  deliverySelected() {
    this.delivery = true;
    this.orderForm.get('deliveryOrPickup').setValue("delivery")
  }

  pickUpSelected() {
    this.delivery = false;
    this.orderForm.get('deliveryOrPickup').setValue("pickup")
  }


}
