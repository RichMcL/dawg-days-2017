import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

    constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private storage: Storage) {
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
        currentUserRef.set({ email: email, uid: uid, displayName: email });
    }
}
