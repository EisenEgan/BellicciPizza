import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class AdminService {

  constructor(private http: Http) { }

  addCategory(name: String) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/api/category', { name: name }/*, { headers: headers }*/)
      .map(res => res.json())
  }

  deleteCategory(categoryName: String) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.delete('http://localhost:3000/api/category', new RequestOptions({ body: { "categoryName": categoryName } }))
      .map(res => res.json())
  }

  editCategory(oldAndNewCategories: Object) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.put('http://localhost:3000/api/category', oldAndNewCategories)
      .map(res => res.json())
  }

  addItem(item: Object) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/api/items', item/*, { headers: headers }*/)
      .map(res => res.json())
  }

  deleteItem(item: Object) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.delete('http://localhost:3000/api/items', new RequestOptions({ body: item })).map(res => res.json())
  }

  editItem(item: Object) {
    // let headers = new Headers();
    // this.loadToken()
    // headers.append('Authorization', 'JWT ' + this.authToken)
    // headers.append('Content-Type', 'application/json')
    return this.http.put('http://localhost:3000/api/items', item).map(res => res.json())
  }
}
