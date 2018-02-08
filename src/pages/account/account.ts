import { Component, NgZone } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  profilePic: string;
  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData,
  public zone: NgZone) {}

  ionViewWillEnter(){
    this.loaduserdetails();
  }
  ngAfterViewInit() {
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    }
    this.getUsername();
  }

  loaduserdetails(){

    this.userData.getuserdetails().then((res: any)=>{
      this.username = res.displayName;
      this.zone.run(()=>{
        this.profilePic = res.photoURL;
      })
    })
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      inputs: [{
        name: 'username',
        placeholder: 'Nick Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: (data:any)=>{
          console.log(data.username + 'click cancel buttion');
        }
      },
      {
        text: 'Edit',
        handler: (data: any)=> {
          if(data.username){
            this.userData.updatedisplayname(data.username).then((res: any)=>{
              if(res.success){
                alert.setTitle('updated');
                alert.setSubTitle('Your display name has been changed successfully!');
                alert.present();
                this.zone.run(()=>{
                  this.username = data.username
                })
              }else{
                alert.setTitle('updated');
                alert.setSubTitle('Your displayname was not changed');
                alert.present();
              }
            })
          }
        }
      }]
    });

    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      console.log("GET USER NAME ::: " + username);
      this.username = username;
      
      this.userData.getProfilePic().then((prifilePic) => {
        console.log("GET USER prifilePic ::: " + prifilePic);
        this.profilePic = prifilePic;
      }).catch((err) =>{
        console.log("GET USER prifilePic err ::: " + err);
      });
  
    }).catch((err) =>{
      console.log("GET USER NAME err ::: " + err);
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
