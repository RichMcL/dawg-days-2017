import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserProvider {
    cameraData: string;
    photoTaken: boolean;
    photoSelected: boolean;

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
    getPicture() {
        let base64Picture;
        let options = {
            allowEdit: true,
            targetHeight: 300,
            targetWidth: 300,
            correctOrientation: true,
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

    takePicture() {
        this.getUid().then(uid => {
            let pictureRef = this.afDatabase.database.ref(`/users/${uid}/picture`);

            var options = {
                allowEdit: true,
                targetHeight: 300,
                targetWidth: 300,
                correctOrientation: true,
                sourceType: this.camera.PictureSourceType.CAMERA,
                destinationType: this.camera.DestinationType.DATA_URL
            };
            this.camera.getPicture(options).then((imageData) => {
                this.cameraData = 'data:image/jpeg;base64,' + imageData;
                this.photoTaken = true;
                this.photoSelected = false;

                pictureRef.set(this.cameraData);
            }, (err) => {
                // Handle error
            });
        });
    }
}
