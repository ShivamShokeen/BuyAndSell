import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { UserCredentialsService } from './user-credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userCredentials: UserCredentialsService,
    public toastController: ToastController,
    public router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#3880ff');
    });
    firebase.initializeApp(environment.firebaseConfig);
  }

  userLogout() {
    firebase.auth().signOut().then(() => {
      console.log("Sign-out successful.");
      this.userCredentials.UID = "";
      this.userCredentials.userUID = "";
      this.userCredentials.businessUserUID = "";
      this.userCredentials.userId = "";
      this.userCredentials.userName = "";
      this.logoutMessage();
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You are successfully signout.',
      duration: 7000,
      position: 'bottom',
    });
    toast.present();
  }
}
