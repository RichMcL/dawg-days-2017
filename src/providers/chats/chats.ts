import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';

import { UserProvider } from "../user/user";

@Injectable()
export class ChatsProvider {

    constructor(private afDatabase: AngularFireDatabase, private userProvider: UserProvider) {
    }

    getChatRef(uid, interlocutor) {
        let firstRef = this.afDatabase.object(`/chats/${uid},${interlocutor}`, { preserveSnapshot: true });
        let promise = new Promise((resolve, reject) => {
            firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if (a) {
                    resolve(`/chats/${uid},${interlocutor}`);
                } else {
                    let secondRef = this.afDatabase.object(`/chats/${interlocutor},${uid}`, { preserveSnapshot: true });
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if (!b) {
                            // this.addChats(uid,interlocutor);
                        }
                    });
                    resolve(`/chats/${interlocutor},${uid}`);
                }
            });
        });

        return promise;
    }

}
