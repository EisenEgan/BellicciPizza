import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  coords: any;
  lat: number;
  lng: number;

  constructor() {
    this.coords = [
      [44.9695247, -93.1064527],
      [44.9744402, -93.2732667]
    ];
    this.lat = (this.coords[0][0] + this.coords[1][0]) / 2;
    this.lng = (this.coords[0][1] + this.coords[1][1]) / 2;
  }

  ngOnInit() {
  }

}
