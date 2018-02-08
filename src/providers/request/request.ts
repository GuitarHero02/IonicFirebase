import { UserData } from './../user-data';
import { Injectable } from '@angular/core';
import { connreq } from '../../model/request';

import firebase from 'firebase';
import { Events } from 'ionic-angular';

@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  myfriends;
  userdetails;
  constructor(public userProvider: UserData, public events: Events) {
  }

  sendrequest(req: connreq){
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      })
    }).then(() => {
      resolve({ success: true});
    }).catch((err) => {
      reject(err);
    })
    return promise;
  }

  getmyrequests(){
    let allmyrequests;
    var myrequests= [];
    this.firereq.child(firebase.auth().currentUser.uid).once('value', (snapshot) =>{
      allmyrequests = snapshot.val();
      myrequests = [];
      for(var i in allmyrequests){
        myrequests.push(allmyrequests[i].sender);
      }
      this.userProvider.getuserdetails().then((res) => {
        var allusers =res;
        this.userdetails = [];
        for (var j in myrequests)
          for(var key in allusers){
            if(myrequests[j] === allusers[key].uid){
              this.userdetails.push(allusers[key]);
            }
          }
          this.events.publish('gotrequests');
      })
    })
  }

  acceptrequest(buddy){
    var promise = new Promise((resolve, reject) =>{
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(()=>{
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          this.deleterequest(buddy).then(()=>{
            resolve(true);
          }).catch((err)=>{
            reject(err);
          })
        })
      })
    })
    return promise;
  }

  deleterequest(buddy){
    var promise = new Promise((reject, resolve)=>{
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let tempstore = snapshot.val();
        let somekey = Object.keys(tempstore);
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey[0]).remove().then(()=>{
          resolve(true)
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  getmyfriends(){
    let frienduid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot)=>{
      let allfriends = snapshot.val();
      
      for(var i in allfriends){
        frienduid.push(allfriends[i].uid);
      }

      this.userProvider.getallusers().then((users)=>{
        this.myfriends =[];
        for(var j in frienduid)
          for(var key in users){
            if(frienduid[j] === users[key].uid){
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err)=>{
        alert(err);
      })
    })
  }
}
