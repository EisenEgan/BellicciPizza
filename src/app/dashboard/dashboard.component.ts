import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {trigger, transition, style, animate, state} from '@angular/animations'
import { NgForm } from '@angular/forms'

import { AdminService } from '../services/admin.service'
import { AuthService } from '../services/auth.service'

@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateY(0)', 'opacity': 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ transform: 'translateY(0)', 'opacity': 1 }),
            animate('500ms', style({ transform: 'translateY(-100%)', 'opacity': 0 }))
          ]
        )
      ]
    )
  ]
})
export class DashboardComponent implements OnInit {

  categories: Object[]
  items: any//Object[]
  locationNames: Object[]

  showCategory: boolean = false;
  showItem: boolean = false;
  catName: String;

  addCatSubmitted: boolean = false;
  addItemSubmitted: boolean = false;

  item = {
    name: "",
    category: "",
    price: "",
    location: "",
    calories: "",
    size: ""
  }

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getInfo().subscribe(data => {
      this.categories = data.categories
      this.items = data.items
      this.locationNames = data.locations
      // console.log(this.items)
    }, err => {
      console.log(err)
      return false
    })
  }

  logout(value: boolean) {
    // this.authService.logout()
    this.router.navigate(['admin/login'])
  }

  showCat(show: boolean) {
    // if (this.showItem) {
    //   this.showItem = !this.showItem
    //   setTimeout(function() {
    //     this.showCategory = !this.showCategory
    //   }, 1000)
    // } else {
    //   this.showCategory = !this.showCategory
    // }
    this.showCategory = !this.showCategory
  }

  showIt(show: boolean) {
    // if (this.showCategory) {
    //   console.log('print')
    //   this.showCategory = !this.showCategory
    //   setTimeout(function() {
    //     this.showItem = !this.showItem
    //   }, 500)
    // } else {
    //   this.showItem = !this.showItem
    // }
    this.showItem = !this.showItem
  }

  addCategory(form: NgForm) {
    if (form.valid) {
      this.addCatSubmitted = false
      this.adminService.addCategory(this.catName).subscribe((data) => {
        this.categories.push(data);
        this.showCategory = !this.showCategory
      })
    } else {
      this.addCatSubmitted = true
    }
  }

  addItem(form: NgForm) {
    if (form.valid) {
      console.log(this.item)
      this.addItemSubmitted = false
      this.adminService.addItem(this.item).subscribe((data) => {
        if (data.success) {
          var addedToExistingCategory: boolean = false;
          this.items.forEach((definedItem) => {
            if (definedItem.categoryName == data.item.category.name) {
              data.item.location = this.item.location
              definedItem.items.push(data.item)
              addedToExistingCategory = true
            }
          })
          if (!addedToExistingCategory) {
            var obj = {}
            obj["categoryName"] = data.item.category.name
            obj["items"] = [data.item]
            this.items.push(obj)
          }
          this.item = {
            name: "",
            category: "",
            price: "",
            location: "",
            calories: "",
            size: ""
          }
          console.log(this.items)
        }
      })
    } else {
      this.addItemSubmitted = true
    }
  }
}
