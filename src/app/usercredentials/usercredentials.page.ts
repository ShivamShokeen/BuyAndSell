import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCredentialsService } from '../user-credentials.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { WindowService } from '../window.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-usercredentials',
  templateUrl: './usercredentials.page.html',
  styleUrls: ['./usercredentials.page.scss'],
})
export class UsercredentialsPage implements OnInit {

  @Input('for') for : string = "";
  paramRequestType: string;
  userDetails = {
    name: "",
    country: "",
    city: "",
    email: "",
    password: "",
    address: "",
    uid: ""
  };

  showRegistrationForm = false;
  error = null;
  clearErrorMessage = true;
  phone = {
    phoneNumber: "",
    phoneVerification: ""
  }
  windowRef: any;
  appVerifier: any;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private router: Router, private route: ActivatedRoute, public userCredentials: UserCredentialsService, private toastController: ToastController, private windowService: WindowService, private http: HttpClient, public alertController: AlertController,public modalController: ModalController) {
    this.paramRequestType = this.route.snapshot.params['for'];
    console.log(this.paramRequestType)
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;
  }


  onSignUp(form: NgForm) {
    if (form.valid) {
      console.log(form);
      console.log(form.value);
      firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.passwords)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.userDetails.name
              });
            }
            console.log(userLogginDetails.uid);
            this.userDetails.uid = userLogginDetails.uid;
            this.http.post('https://buyandsell-58d92.firebaseio.com/userAccounts.json', this.userDetails).subscribe(responseData => {
              console.log("User signup successfully");
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })

      this.signupSuccessMessage();
      this.router.navigate(['/usercredentials','signin']);
    }
  }

  userLogin(emailId, password) {
    if (emailId.value != undefined || emailId.value != "" && password.value != undefined || password.value != "") {
      this.waitMessage();
      firebase.auth().signInWithEmailAndPassword(emailId.value, password.value)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            this.userCredentials.UID = userLogginDetails.uid;
            this.userCredentials.getLogginUserDetails();
            this.router.navigate(['/home']);
          })
        .catch(error => {
          console.log(error);
          console.log(error.message);
          this.signupErrorMessage(error.message);
        })
    }
    else {
      this.emptyFieldAlert();
    }
  }
  
  onDismiss(){
    this.modalController.dismiss();
  }


  resetErrorMessage() {
    this.clearErrorMessage = false;
    console.log("reseted");
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter all the detail's before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async signupSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Transfering to Signin/Login :)',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  async waitMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few seconds :) .',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async phoneErrorMessage() {
    const toast = await this.toastController.create({
      message: 'Phone number should be of 10 digits.',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async smsErrorMessage(messages) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

  async signupErrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
}
