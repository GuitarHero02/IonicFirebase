import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public userService: UserData
  , public alertCtrl: AlertController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  reset(){
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    })
    this.userService.passwordreset(this.email).then((res: any)=>{
      if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password.')
      }
    }).catch((err)=>{
      alert.setTitle('Failed');
      alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
}
