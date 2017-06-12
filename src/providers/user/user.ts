import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";
import { AngularFireDatabase } from "angularfire2/database";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(public afDatabase: AngularFireDatabase, public local: Storage, private camera: Camera) {
    console.log('Hello UserProvider Provider');
  }

  // Get Current User's UID
  getUid() {
    return this.local.get('uid');
  }

  getUser() {
    // Getting UID of Logged In User
    return this.getUid().then(uid => {
      return this.afDatabase.object(`/users/${uid}`);
    });
  }

  updateDisplayName(uid, newDisplayName) {
    this.getUser().then(user => {
      user.update({ displayName: newDisplayName });
    })
  }

  // Get All Users of App
  async getAllUsers() {
    return Promise.resolve(this.afDatabase.list('/users'));
  }

  // Get base64 Picture of User
  getPicture() {
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };

    let promise = new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imageData) => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
      }, (error) => {
        reject(error);
      });

    });
    return promise;
  }

  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.afDatabase.database.ref(`/users/${uid}/picture`);
      this.getPicture()
        .then((image) => {
          pictureRef.set(image);
        });
    });
  }


}
