import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {AngularFireDatabase} from "angularfire2/database";


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public storage: Storage) {
  }

  signin(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut() {
    this.storage.remove('uid');
    this.afAuth.auth.signOut();
  }

  createAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.storage.set('uid', data.uid);
        this.createUserRecord(email, data.uid);
      });
  }

  createUserRecord(email: string, uid: any) {
    let currentUserRef = this.afDatabase.database.ref(`/users/${uid}`);
    currentUserRef.set({email: email, uid: uid, displayName: email});
    console.log(currentUserRef);
  }
}
