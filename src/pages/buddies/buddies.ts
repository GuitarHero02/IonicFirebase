import { RequestProvider } from './../../providers/request/request';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { connreq } from '../../model/request';
import { UserData } from './../../providers/user-data';
import firebase from 'firebase';
 
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
  newrequest = {} as connreq;
  filteredusers = [];
  searchstring:string = '';
  temparr = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserData,
    public alertCtrl: AlertController,
    public requestProvider: RequestProvider) {
      this.userProvider.getallusers().then((res: any)=>{
        this.filteredusers = res;
        this.temparr = res;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddiesPage');
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if(this.newrequest.sender == this.newrequest.recipient){
      alert('You are your friend always');
    }else {
      let successalert = this.alertCtrl.create({
        title:'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestProvider.sendrequest(this.newrequest).then((res: any) =>{
        if(res.success){
          successalert.present();

          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
     
    }
    
  }

  searchuser(searchbar){
    this.filteredusers = this.temparr;
    let q = searchbar.target.value;
    if(q.trim()==''){
      return;
    }

    this.filteredusers = this.filteredusers.filter((v)=>{
      if((v.displayName.toLowerCase().indexOf(q.toLowerCase()))>-1){
        return true;
      }
      return false;
    })
  }
}
