import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserCredentialsService } from './user-credentials.service';

@Injectable({
  providedIn: 'root'
})
export class BuysellService {

  addedProductDetails = [];
  productQuantity = [];
  arrSlice = [];
  productCalculation: number;
  cartProductPrice = [];
  Total: any;
  date: Date = new Date();

  constructor(private http: HttpClient, private router: Router,private userCredentials : UserCredentialsService) { this.getData(); }

  getData() {
    this.http.get('https://buyandsell-58d92.firebaseio.com/addedProducts.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.addedProductDetails.push({ ...responseData[key], id: key })
          }
        }
        return this.addedProductDetails;
      })
    ).subscribe(getData => {
      // console.log(getData);
    });
  }

  filterResults(searchText) {
    if (searchText == undefined) {
      // let removeDup: any;
      // removeDup = this.addedProductDetails.filter((v, i, a) => a.findIndex(t => ( t.images && t.id === v.id)) === i);
      // console.log(removeDup);
      // let m;
      // m = this.addedProductDetails.filter((v = "H", i, a) => {console.log(v)});
      // console.log(m)
      return this.addedProductDetails;
    }
    else {
      let removeDup: any;
      removeDup = this.addedProductDetails.filter((v, i, a) => a.findIndex(t => ( t.images && t.id === v.id)) === i);
      console.log(removeDup);
      // let k;
      // let m;
      // k = this.addedProductDetails.filter((v, i, a) => {console.log(a)});

      return removeDup.filter(value => {
        return value.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1 
        // || value.category.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
      })
    }
  }

  shoppingCart(id, name, images, price, methodOfPayment, quantity, location, propertyFor) {
    console.log(id + " " + name + " " + price + " " + methodOfPayment + " " + quantity + " " + location + " " + propertyFor);
    this.productQuantity.push({
      uid : this.userCredentials.userId,
      userName : this.userCredentials.userName,
      date : this.date,
      id: id,
      name: name,
      images: images,
      methodOfPayment: methodOfPayment,
      location: location,
      propertyFor: propertyFor,
      quantity: quantity,
      price: price
    });
    console.log(this.productQuantity);
    this.calculationOfCart();
  }

  calculationOfCart() {
    this.arrSlice = this.productQuantity.slice(-1);
    this.arrSlice.forEach((value) => {
      if (value.quantity > 0 && value.price > 0) {
        this.productCalculation = value.quantity * value.price;
        console.log("product Calculation " + JSON.stringify(this.productCalculation) + "(Quantity" + value.quantity + "*" + value.price + "Price)");
      }
    });
    this.cartProductPrice.push(this.productCalculation);
    this.Total = this.cartProductPrice.map(a => a).reduce(function (a, b) {
      return a + b;
    });
  }


}
