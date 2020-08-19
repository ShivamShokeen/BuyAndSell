import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentialsService } from 'src/app/user-credentials.service';
import { BuysellService } from 'src/app/buysell.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {

  urlParameter: string;
  product: any;
  productUpdate: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, public userCredentials: UserCredentialsService, public buyandsell: BuysellService, private http: HttpClient, public toastController: ToastController) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
    else {
      this.urlParameter = this.route.snapshot.params['id'];
      console.log(this.urlParameter);
      this.filterFirst();
      this.initForm();
    }
  }

  ngOnInit() {
  }

  filterFirst() {
    console.log(this.buyandsell.addedProductDetails);
    this.product = this.buyandsell.addedProductDetails.find((value) => value.id == this.urlParameter);
    console.log(this.product)
  }

  //home page not updated

  initForm() {
    this.productUpdate = new FormGroup({
      'uid': new FormControl(this.product.uid),
      'name': new FormControl(this.product.name),
      'images': new FormControl(this.product.images),
      'quantity': new FormControl(this.product.quantity),
      'location': new FormControl(this.product.location),
      'price': new FormControl(this.product.price),
      'description': new FormControl(this.product.description),
      'categoryType': new FormControl(this.product.categoryType),
      'propType': new FormControl(this.product.Propertycategory.type),
      'propFacing': new FormControl(this.product.Propertycategory.facing),
      'propMaintenance': new FormControl(this.product.Propertycategory.maintenance),
      'propLeaseAggrement': new FormControl(this.product.Propertycategory.leaseAggrement),
      'propMethodOfPayment': new FormControl(this.product.Propertycategory.methodOfPayment),
      'propOffers': new FormControl(this.product.Propertycategory.offers),
      'propSecurityFeatures': new FormControl(this.product.Propertycategory.securityFeatures),
      'propAlternativeContactNumber': new FormControl(this.product.Propertycategory.alternativeContactNumber),
      'propPaymentStatus': new FormControl(this.product.Propertycategory.paymentStatus),
      'propPaymentRenew': new FormControl(this.product.Propertycategory.paymentRenew),
      'propMeal': new FormControl(this.product.Propertycategory.meal),
      'propPropertyFor': new FormControl(this.product.Propertycategory.propertyFor),
      'propFurnishing': new FormControl(this.product.Propertycategory.furnishing),
      'propBuiltupArea': new FormControl(this.product.Propertycategory.builtupArea),
      'propCarpetArea': new FormControl(this.product.Propertycategory.carpetArea),
      'propTotalFloors': new FormControl(this.product.Propertycategory.totalFloors),
      'propFloorNo': new FormControl(this.product.Propertycategory.floorNo),
      'mobileSpecificationsUrl': new FormControl(this.product.MobileCategory.specificationsUrl),
      'mobileColor': new FormControl(this.product.MobileCategory.color),
      'mobileSoftwareVersion': new FormControl(this.product.MobileCategory.softwareVersion),
      'mobilePrimaryCamera': new FormControl(this.product.MobileCategory.primaryCamera),
      'mobileSecondaryCamera': new FormControl(this.product.MobileCategory.secondaryCamera),
      'mobileBrand': new FormControl(this.product.MobileCategory.brand),
    });

  }

  productSubmit() {
    if (this.productUpdate.valid) {
      console.log(this.productUpdate.value)
      let redesignFormat;
      redesignFormat = {
        uid: this.productUpdate.value.uid,
        name: this.productUpdate.value.name,
        images: this.productUpdate.value.images,
        quantity: this.productUpdate.value.quantity,
        location: this.productUpdate.value.location,
        price: this.productUpdate.value.price,
        description: this.productUpdate.value.description,
        categoryType: this.productUpdate.value.categoryType,
        Propertycategory:
        {
          type: this.productUpdate.value.propType,
          facing: this.productUpdate.value.propFacing,
          maintenance: this.productUpdate.value.propMaintenance,
          leaseAggrement: this.productUpdate.value.propLeaseAggrement,
          methodOfPayment: this.productUpdate.value.propMethodOfPayment,
          offers: this.productUpdate.value.propOffers,
          securityFeatures: this.productUpdate.value.propSecurityFeatures,
          alternativeContactNumber: this.productUpdate.value.propAlternativeContactNumber,
          paymentStatus: this.productUpdate.value.propPaymentStatus,
          paymentRenew: this.productUpdate.value.propPaymentRenew,
          meal: this.productUpdate.value.propMeal,
          propertyFor: this.productUpdate.value.propPropertyFor,
          furnishing: this.productUpdate.value.propFurnishing,
          builtupArea: this.productUpdate.value.propBuiltupArea,
          carpetArea: this.productUpdate.value.propCarpetArea,
          totalFloors: this.productUpdate.value.propTotalFloors,
          floorNo: this.productUpdate.value.propFloorNo
        },
        MobileCategory:
        {
          specificationsUrl: this.productUpdate.value.mobileSpecificationsUrl,
          color: this.productUpdate.value.mobileColor,
          softwareVersion: this.productUpdate.value.mobileSoftwareVersion,
          primaryCamera: this.productUpdate.value.mobilePrimaryCamera,
          secondaryCamera: this.productUpdate.value.mobileSecondaryCamera,
          brand: this.productUpdate.value.mobileBrand,
        }
      };
      console.log(this.productUpdate.value);
      let specificKey;
      specificKey = 'https://buyandsell-58d92.firebaseio.com/addedProducts/' + this.urlParameter + '.json';
      console.log(specificKey);
      this.http.put(specificKey, redesignFormat).subscribe(data => {
        console.log(data);
        this.successMessage();
        window.location.reload();
      });
      // window.location.reload();
      // firebase.auth().signOut().then(() => {
      //   console.log("Sign-out successful.");
      //   this.userCredentials.UID = "";
      //   this.userCredentials.userUID = "";
      //   this.userCredentials.businessUserUID = "";
      //   this.userCredentials.userName = "";
      //   this.userCredentials.userId = "";
      //   this.logoutMessage();
      //   window.location.reload();
      //   // window.location.href(['/home'])
      // }).catch((error) => {
      //   console.log(error);
      // });
    }
    else {
      this.emptyField();
    }
  }

  async emptyField() {
    const toast = await this.toastController.create({
      message: 'Your need to fill required details.',
      duration: 2000
    });
    toast.present();
  }

  async successMessage() {
    const toast = await this.toastController.create({
      message: 'Updated successfully.',
      duration: 2000
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
