import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  firedata = firebase.database().ref('/chatusers');
  constructor(
    public events: Events,
    public storage: Storage,
    public afireauth: AngularFireAuth
  ) {}

  adduser(newuser){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.username,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/december-ab619.appspot.com/o/puppy.jpg?alt=media&token=7269c7a8-4560-4504-80e6-fddea4c555f9'
        }).then(()=>{
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.username,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/december-ab619.appspot.com/o/puppy.jpg?alt=media&token=7269c7a8-4560-4504-80e6-fddea4c555f9'
          }).then(()=>{
            resolve({success: true});
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email){
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() =>{
        resolve({success: true});
      }).catch((err)=> {
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(()=>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success: true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  getuserdetails(){
    var promise = new Promise((resolve, reject)=>{
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err)=>{
      reject(err);
    })
  })

    return promise;
  }

  updatedisplayname(newname){
    let promise = new Promise((resolve, reject)=>{
    this.afireauth.auth.currentUser.updateProfile({
      displayName:newname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(()=>{
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(()=>{
        resolve({ success: true});
      })
      .catch((err)=>{
        reject(err);
      })
    }).catch((err)=>{
      reject(err);
    })
  })
  return promise;
  }


  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setProfilePic(profilePic: string): void {
    this.storage.set('profilePic', profilePic);
  };

  getProfilePic(): Promise<string> {
    return this.storage.get('profilePic').then((value) => {
      return value;
    });
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };

  getallusers() {
    let promise = new Promise((resolve, reject) =>{
      this.firedata.orderByChild('uid').once('value', (snapshot)=>{
        let userdata = snapshot.val();
        let temparr = [];
        for(var key in userdata){
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }
}
