import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentialsService } from '../user-credentials.service';
import { BuysellService } from '../buysell.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackDetails = {
    userUid: this.userCredentials.userId,
    userName: this.userCredentials.userName,
    customName: "",
    emailId: "",
    subject: "",
    ratings: "",
    message: ""
  }

  constructor(private route: ActivatedRoute, private router: Router, public userCredentials: UserCredentialsService, public buyandsell: BuysellService, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
  }

  feedbackForm(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.http.post('https://buyandsell-58d92.firebaseio.com/feedback.json', this.feedbackDetails).subscribe(data => {
        this.thanksMessage();
        this.router.navigate(['/home']);
      })
    }
    else {
      this.emptyField()
    }
  }

  async emptyField() {
    const toast = await this.toastController.create({
      message: 'Your need to fill required details.',
      duration: 2000
    });
    toast.present();
  }

  async thanksMessage() {
    const toast = await this.toastController.create({
      message: 'Thanks for feedback :)',
      duration: 2000
    });
    toast.present();
  }

}
