import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, LoadingController } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook'

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthProvider } from '../../providers/auth';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', email: '', password: '', profilePic: '' };
  submitted = false;


  constructor(
    public navCtrl: NavController
    , public userData: UserData
    , private loadingCtrl: LoadingController
    , private authService: AuthProvider
    , public facebook: Facebook ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  facebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider+ "   ::::::::::::::::::get result Facebook1" );
    firebase.auth().signInWithRedirect(provider).then(()=>{
      console.log("   ::::::::::::::::::get result Facebook2" );
      firebase.auth().getRedirectResult().then((result)=>{
        console.log(result.user+ "   ::::::::::::::::::get result Facebook3" );
      }).catch(function(error){
        alert(JSON.stringify(error));
      });
    }).catch(function(error){
      alert(JSON.stringify(error));
    });
    // return this.facebook.login(['email'])
    //   .then( response => {
    //     const facebookCredential = firebase.auth.FacebookAuthProvider
    //       .credential(response.authResponse.accessToken);
  
    //     firebase.auth().signInWithCredential(facebookCredential)
    //       .then( success => { 
    //         console.log("Firebase success: " + JSON.stringify(success)); 
    //       });
  
    //   }).catch((error) => { console.log(error) });

    //firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;

      if (user != null) {
        console.log("facebook  Name: " + user.displayName);
        this.login.username = user.displayName;
        this.login.email = user.email;
        this.login.profilePic = user.photoURL;
        this.userData.login(this.login.username);
        this.userData.setProfilePic(this.login.profilePic);
        this.navCtrl.push(TabsPage);
      }
        
      
    //});
  }

  googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    console.log( "   ::::::::::::::::::get result Google1"  + provider);
    firebase.auth().signInWithRedirect(provider).then(()=>{
      console.log("   ::::::::::::::::::get result Google2" );
      firebase.auth().getRedirectResult().then((result)=>{
        console.log(result.user+ "   ::::::::::::::::::get result Google3" );
        //alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error));
      });
    }).catch(function(error){
      alert(JSON.stringify(error));
    });

   // firebase.auth().onAuthStateChanged(function(user) {
      var user = firebase.auth().currentUser;

      if (user != null) {
        console.log(" google Name: " + user.displayName);
        this.login.username = user.displayName;
        this.login.email = user.email;
        this.login.profilePic = user.photoURL;
        this.userData.login(this.login.username);
        this.userData.setProfilePic(this.login.profilePic);
        this.navCtrl.push(TabsPage);
      }
        
      
    //});
  }

  signin() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    // console.log(user);
    this.authService.login(this.login)
      .then(auth => {
        loading.dismiss();
        console.log(auth);
        this.userData.login(this.login.username);
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(err => {
        loading.dismiss();
        alert(JSON.stringify(err));
      });
  }
 
  signup() {
    this.navCtrl.push(SignupPage);
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  passwordreset(){
    this.navCtrl.push('PasswordResetPage');
  }
}
