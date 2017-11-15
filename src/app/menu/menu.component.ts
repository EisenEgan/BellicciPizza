import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms'

import { AdminService } from '../services/admin.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() items: any;
  @Input() categories: any;
  @Input() locations: any;

  selectedItem: any;
  selectedCategory: String;

  showDialog: boolean = false;
  showCategoryDialog: boolean = false;

  editProduct: any;
  editSubmitted: boolean = false;

  editCat: String;
  newCatName: String;
  editCatSubmitted: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes')
    console.log(changes['items'])
    // if (changes['items']) {
    //   this.items = changes['items'];
    // }
    console.log('items')
    console.log(this.items)
    console.log('editProduct')
    console.log(this.editProduct)
  }

  // Delete category from dashboard
  deleteCategory() {
    this.adminService.deleteCategory(this.selectedCategory).subscribe((data) => {
      if (data.success) {
        // console.log(this.items.findIndex(i => (i.categoryName == this.selectedItem.category)))
        this.items.splice(this.items.findIndex(i => (i.categoryName == this.selectedCategory)), 1)
        this.selectedCategory = ""
      }
    })
    this.showCategoryDialog = !this.showCategoryDialog
  }

  editCategory(catName: String) {
    if (this.editCat == catName) {
      this.editCat = ""
      this.newCatName = ""
    } else {
      this.editCat = catName
      this.newCatName = catName
    }
  }

  editCategorySubmit(form: NgForm) {
    var obj = {}
    obj["oldCategoryName"] = this.editCat
    obj["newCategoryName"] = this.newCatName
    if (form.valid) {
      this.adminService.editCategory(obj).subscribe((data) => {
        if (data.success) {
          this.items[this.items.findIndex(i => (i.categoryName == this.editCat))]["categoryName"] = this.newCatName
          this.editCat = ""
          this.newCatName = ""
        }
      })
    } else {
      this.editCatSubmitted = true;
    }
  }

  deleteItem() {
    this.adminService.deleteItem(this.selectedItem).subscribe((data) => {
      if (data.success) {
        // console.log(this.items.findIndex(i => (i.categoryName == this.selectedItem.category)))
        var item = this.items[this.items.findIndex(i => (i.categoryName == this.selectedItem.category.name))]
        item.items.splice(item.items.findIndex(i => (i._id == this.selectedItem._id)), 1)
        this.selectedItem = {}
      }
    })
    this.showDialog = !this.showDialog
  }

  setSelected(product: Object) {
    this.selectedItem = product
    this.showDialog = !this.showDialog
  }

  setSelectedCategory(category: String) {
    this.selectedCategory = category
    this.showCategoryDialog = !this.showCategoryDialog
  }

  edit(product: any) {
    if (this.editProduct && this.editProduct._id == product._id) {
      this.editProduct = {}
    } else {
      this.editProduct = Object.assign({}, product)
      console.log(this.editProduct)
    }
  }

  editItem(form: NgForm) {
    if (form.valid) {
      this.adminService.editItem(this.editProduct).subscribe((data) => {
        if (data.success) {
          // console.log(this.items.findIndex(i => (i.categoryName == this.selectedItem.category)))
          var item = this.items[this.items.findIndex(i => (i.categoryName == this.editProduct.category.name))]
          item.items.splice(item.items.findIndex(i => (i._id == this.editProduct._id)), 1, this.editProduct)
          this.editProduct = {}
        }
      })
    } else {
      this.editSubmitted = true;
    }
  }
}
