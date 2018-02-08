import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController , LoadingController, ToastController} from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', email: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController
    , public userData: UserData
    , public loadingCtrl: LoadingController
    , public toastCtrl: ToastController) {}

  onSignup(form: NgForm) {
    var toaster = this.toastCtrl.create({
      message: 'Error ',
      duration: 3000,
      position: 'bottom'
    });
    this.submitted = true;
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });

    if(this.signup.email ==''||this.signup.password ==''||this.signup.username ==''){
      toaster.setMessage('All Field is required.');
      toaster.present();
    }
    else if(this.signup.password.length < 7){
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else if(form.valid) {
      loader.present();
      this.userData.adduser(this.signup).then((res: any)=>{
        loader.dismiss();
        if(res.success){
          this.navCtrl.push('ProfilePage')
          this.userData.signup(this.signup.username);
        } else
          alert('Error' + res);
      })
      
      //this.navCtrl.push(TabsPage);
    }else{
      console.log('Error Happenned');
    }
  }
}
