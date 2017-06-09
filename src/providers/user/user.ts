import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";
import { AngularFire } from "angularfire2";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(public angularFire: AngularFire, public local:Storage) {
    console.log('Hello UserProvider Provider');
  }

  // Get Current User's UID
  getUid() {
    return this.local.get('uid');
  }

  getUser() {
    // Getting UID of Logged In User
    return this.getUid().then(uid => {
      return this.angularFire.database.object(`/users/${uid}`);
    });
  }

  // Get All Users of App
  async getAllUsers() {
    return Promise.resolve(this.angularFire.database.list('/users'));
  }


}