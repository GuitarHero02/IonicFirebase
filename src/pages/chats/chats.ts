import { RequestProvider } from './../../providers/request/request';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestProvider: RequestProvider,
  public events: Events, public alertCtrl:AlertController)  {
  }

  ionViewWillEnter(){
   this.getmyrequests();
   this.requestProvider.getmyfriends();
   this.events.subscribe('friends', ()=>{
    this.myrequests = [];
    this.myrequests = this.requestProvider.myfriends;
  })
  }

  getmyrequests(){
    this.requestProvider.getmyrequests();
    this.events.subscribe('gotrequests', ()=>{
      this.myrequests = [];
      this.myrequests = this.requestProvider.userdetails;
    })
  }

  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  accept(item){
    this.requestProvider.acceptrequest(item).then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });

      alert.present();
    })
  }

  ignore(item){
     this.requestProvider.deleterequest(item).then(()=>{

     }).catch((err)=>{
       alert(err);
     })
  }

  buddychat(item){

  }

  ionViewDidLeave(){
    this.events.unsubscribe('gotrequests');
  }
  
}
