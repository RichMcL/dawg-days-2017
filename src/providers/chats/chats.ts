import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserProvider } from "../user/user";
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatsProvider {

  constructor(public afDatabase: AngularFireDatabase, public up: UserProvider) {
    console.log('Hello ChatsProvider Provider');
  }

    getChatRef(uid, interlocutor) {
      let firstRef = this.afDatabase.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
      let promise = new Promise((resolve, reject) => {
          firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if(a) {
                    resolve(`/chats/${uid},${interlocutor}`);
                } else {
                    let secondRef = this.afDatabase.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if(!b) {
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
