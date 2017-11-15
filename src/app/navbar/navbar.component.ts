import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() showCat = new EventEmitter<boolean>()
  @Output() showIt = new EventEmitter<boolean>()
  @Output() logout = new EventEmitter<boolean>();

  constructor() { }
  showCategory = false
  showItem = false
  ngOnInit() {
  }

  showAddCategory() {
    this.showCategory = !this.showCategory
    this.showCat.emit(this.showCategory)
  }

  showAddItem() {
    this.showItem = !this.showItem
    this.showIt.emit(this.showItem)
  }

  logoutAdmin() {
    this.logout.emit(true)
  }
}
