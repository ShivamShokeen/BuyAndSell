import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BuysellService } from 'src/app/buysell.service';
import { UserCredentialsService } from 'src/app/user-credentials.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  addProduct = {
    uid: this.userCredentials.userId,
    name: "",
    images: "",
    quantity: "",
    location: "",
    price: "",
    description: "",
    categoryType: "",
    Propertycategory:
    {
      type: "",
      facing: "",
      maintenance: "",
      leaseAggrement: "",
      methodOfPayment: "",
      offers: "",
      securityFeatures: "",
      alternativeContactNumber: "",
      paymentStatus: "",
      paymentRenew: "",
      meal: "",
      propertyFor: "",
      furnishing: "",
      builtupArea: "",
      carpetArea: "",
      totalFloors: "",
      floorNo: ""
    },
    MobileCategory:
    {
      specificationsUrl: "",
      color: "",
      softwareVersion: "",
      primaryCamera: "",
      secondaryCamera: "",
      brand: "",
    },
  }

  productCategories = [
    {
      name: "Properties"
    },
    {
      name: "Mobile"
    },
    // {
    //   name: "Electronics & Applinces"
    // },
    // {
    //   name: "CD,DVD"
    // },
    // {
    //   name: "Car"
    // },
    // {
    //   name: "Furniture"
    // },
    // {
    //   name: "Job"
    // },
    // {
    //   name: "Bike"
    // },
    // {
    //   name: "Books,Sports equipments"
    // },
    // {
    //   name: "Fashion"
    // },
    // {
    //   name: "Pets"
    // },
    // {
    //   name: "Services"
    // }
  ]

  propertyCategories = [
    {
      name: "Appartment"
    },
    {
      name: "Building floor"
    },
    {
      name: "House & villa"
    },
    {
      name: "Roommate"
    },
    {
      name: "Farm house"
    }
  ]

  productDetails: any;
  selectedCategory: string;
  type: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, public toastController: ToastController, private router: Router, public buyandsell: BuysellService, public userCredentials: UserCredentialsService,) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
    else {
      this.type = this.route.snapshot.params['for'];
      console.log(this.type);
      this.userMovies();
    }
  }

  ngOnInit() {
  }

  tagSelected(event: any) {
    if (event.detail.checked == true) {
      console.log(event.detail.value);
      if (event.detail.value == 'Rent' || event.detail.value == 'Sell') {
        this.addProduct.Propertycategory.propertyFor = event.detail.value;
      }
      else if (event.detail.value == 'Appartment' || event.detail.value == 'Building floor' || event.detail.value == 'House & villa' || event.detail.value == 'Roommate' || event.detail.value == 'Farm house') {
        this.addProduct.Propertycategory.type = event.detail.value;
      }
      else if (event.detail.value == 'Furnished' || event.detail.value == 'Semi-Furnished' || event.detail.value == 'Unfurnished') {
        this.addProduct.Propertycategory.furnishing = event.detail.value;
      }
      else if (event.detail.value == 'yes' || event.detail.value == 'no') {
        this.addProduct.Propertycategory.meal = event.detail.value;
      }
      else if (event.detail.value == 'monthly' || event.detail.value == 'yearly') {
        this.addProduct.Propertycategory.paymentStatus = event.detail.value;
      }
      console.log(this.addProduct);
    }
  }
  submit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      console.log(this.addProduct);
      this.http.post('https://buyandsell-58d92.firebaseio.com/addedProducts.json', this.addProduct).subscribe(responseData => {
        this.successAddMessage();
        window.location.reload();
      })
    }
  }

  userMovies() {
    console.log(this.userCredentials.userId)
    if (this.buyandsell.addedProductDetails && this.type == 'edit') {
      this.productDetails = this.buyandsell.addedProductDetails.filter(value => value.uid == this.userCredentials.userId);
      console.log(this.productDetails);
    }
    console.log(this.productDetails);
  }
  async successAddMessage() {
    const toast = await this.toastController.create({
      message: "Added successfully.",
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You need to signin again and I am working on this.',
      duration: 7000,
      position: 'bottom',
    });
    toast.present();
  }

}
