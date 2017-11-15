import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class MenuService {

  constructor(private http: Http) { }

  getLocationInfo(location: String) {
    return this.http.get('http://localhost:3000/api/locations/' + location)
      .map(res => res.json());
  }

}
