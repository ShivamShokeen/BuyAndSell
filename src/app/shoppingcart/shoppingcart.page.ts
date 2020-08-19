import { Component, OnInit } from '@angular/core';
import { BuysellService } from '../buysell.service';
import { UserCredentialsService } from '../user-credentials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  
  constructor(private route: ActivatedRoute, private router: Router, public userCredentials: UserCredentialsService, public buyandsell: BuysellService, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {  }

  readyForPayment(){
    if(this.buyandsell.productQuantity.length > 0){
      this.http.post('https://buyandsell-58d92.firebaseio.com/shoppingCart.json',this.buyandsell.productQuantity).subscribe(data=>{
        this.thanksMessage();
      })
    }
  }

  async thanksMessage() {
    const toast = await this.toastController.create({
      message: 'Thanks for purchasing :)',
      duration: 2000
    });
    toast.present();
  }

}

// calculationOfCart() {
//   if (this.productQuantity.quantity > 0 && this.productQuantity.price > 0) {
//     this.productCalculation = this.productQuantity.quantity * this.productQuantity.price;
//     console.log("product Calculation " + JSON.stringify(this.productCalculation) + "(Quantity" + this.productQuantity.quantity + "*" + this.productQuantity.price + "Price)");
//   }
// this.cartProductPrice.push(this.productCalculation);
// this.Total = this.cartProductPrice.map(a => a).reduce(function (a, b) {
//   return a + b;
// });
// console.log(this.Total)
// }