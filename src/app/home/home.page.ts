import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BuysellService } from '../buysell.service';
import { UsercredentialsPage } from '../usercredentials/usercredentials.page';
import { ModalController } from '@ionic/angular';
import { UserCredentialsService } from '../user-credentials.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchText : string;
  productPreview : any;
  constructor(private route : ActivatedRoute,private router :Router,
    private http: HttpClient,public buyandsell : BuysellService,public modalController: ModalController,public userCredentials : UserCredentialsService) {
      this.filter();
    }
  
  filter(){
    let s;
    this.productPreview= this.buyandsell.filterResults(this.searchText);
    // this.s = this.RecipeService.restaurantData.filter((n, i) => this.RecipeService.restaurantData.indexOf(n) == i);
    // this.productPreview = s.map(JSON.stringify).reverse().filter(function (e, i, a) {
    //   return a.indexOf(e, i + 1) === -1;
    // }).reverse().map(JSON.parse);;
  }
  async openUsercredentialsPage() {
    const modal = await this.modalController.create({
      component: UsercredentialsPage,
      componentProps : {for : 'signup'}
    });
    return await modal.present();
  }
}
