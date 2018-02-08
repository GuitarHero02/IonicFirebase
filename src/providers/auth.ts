import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
 
//import * as firebase from 'firebase/app';
//import 'rxjs/add/operator/map';
 
import { UserOptions } from '../interfaces/user-options';
 
 
 
@Injectable()
export class AuthProvider {
    authState: any = null;
  constructor(public http: Http,
    public angularFireAuth: AngularFireAuth) {
  }
 
  login(user: UserOptions) {
    var promise = new Promise((resolve, reject) =>{
    this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then((user) => {
        this.authState = user;
        resolve(true);
    }).catch((error) => {
      console.log(error)
        reject(error);
    });
  })

  return promise;
  }
  
  addUser(user) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then((user) => {
        this.authState = user;
    }).catch(error => console.log(error));
   }
}
