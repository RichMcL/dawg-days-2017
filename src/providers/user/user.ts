import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserProvider {
    constructor(private afDatabase: AngularFireDatabase, private local: Storage, private camera: Camera) { }

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
    getAllUsers() {
        return this.afDatabase.list('/users');
    }

    // Get base64 Picture of User
    loadPictureFromCamera(sourceType) {
        let options = {
            allowEdit: true,
            targetHeight: 300,
            targetWidth: 300,
            correctOrientation: true,
            destinationType: 0,
            sourceType: sourceType,
            encodingType: 0
        };

        return this.camera.getPicture(options);
    }

    savePicture(sourceType) {
        this.getUid().then(uid => {
            let pictureRef = this.afDatabase.database.ref(`/users/${uid}/picture`);

            this.loadPictureFromCamera(sourceType).then((image) => {
                pictureRef.set("data:image/jpeg;base64," + image);
            });
        });
    }

    choosePicture() {
        this.savePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    }

    takePicture() {
        this.savePicture(this.camera.PictureSourceType.CAMERA);
    }
}
