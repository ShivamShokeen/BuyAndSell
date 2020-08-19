import { Component, OnInit } from '@angular/core';
import { BuysellService } from 'src/app/buysell.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentialsService } from 'src/app/user-credentials.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {

  productDetails: any;
  parameterId: number;
  constructor(private buyandsell: BuysellService, private route: ActivatedRoute, private router: Router,public userCredentials : UserCredentialsService, public toastController: ToastController) {
    if(!this.userCredentials.UID){
      this.router.navigate(['/home']);
      this.signinMessage(); 
    }
    else {
    this.parameterId = this.route.snapshot.params['id'];
    console.log(this.parameterId)
    }
  }

  ngOnInit() {
    this.productDetails = this.buyandsell.addedProductDetails.filter((value) => value.id == this.parameterId);
    console.log(this.productDetails)
  }

  shoppingCart(id, name,images, price, methodOfPayment, quantity, location, propertyFor) {
    this.buyandsell.shoppingCart(id, name, images, price, methodOfPayment, quantity, location, propertyFor);
    this.router.navigate(['/shoppingcart']);
  }

  async signinMessage() {
    const toast = await this.toastController.create({
      message: 'You need to signin.',
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }

}
