import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import { UserData } from '../../providers/user-data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imgurl = "https://firebasestorage.googleapis.com/v0/b/december-ab619.appspot.com/o/puppy.jpg?alt=media&token=7269c7a8-4560-4504-80e6-fddea4c555f9";
  moveon = true;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public imghandlerProvider:ImagehandlerProvider
  , public zone: NgZone
  , public userService: UserData
  , public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandlerProvider.uploadimage().then((url:any)=>{
      this.userService.updateimage(url).then((res: any)=>{
        if(res.success){
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile picture has been changed successfully!');
          statusalert.present();
          this.zone.run(()=>{
            this.imgurl = url;
          })
        }
      }).catch(()=>{
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile picture was not changed!');
        statusalert.present();
      })
    })
  }

  chooseimage(){
    this.imghandlerProvider.uploadimage().then((uploadurl: any) =>{
      this.imgurl = uploadurl;
      this.zone.run(() =>{
        this.imgurl = uploadurl;
        this.moveon = false;
      });
    });
  }

  updateproceed(){
    this.userService.updateimage(this.imgurl).then((res: any)=>{
      if(res.success){
        this.navCtrl.setRoot('TabsPage');
      }else{
        alert(res);
      }
    })
  }

  proceed(){
    this.navCtrl.setRoot('TabsPage');
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot('LoginPage');
    })
  }
}
