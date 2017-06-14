import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { NavController, NavParams } from 'ionic-angular';

import { ChatsProvider } from "../../providers/chats/chats";
import { UserProvider } from "../../providers/user/user";

@Component({
    selector: 'page-chat-view',
    templateUrl: 'chat-view.html',
})
export class ChatViewPage {
    message: string;
    uid: string;
    messagee: any;
    user: any;
    chats: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public chatsProvider: ChatsProvider, public userProvider: UserProvider, public afDatabase: AngularFireDatabase, private sanitizer: DomSanitizer) {
        this.uid = navParams.data.uid;
        this.messagee = navParams.data.messagee;
    }

    async ngOnInit() {
        this.chatsProvider.getChatRef(this.uid, this.messagee.$key)
            .then((chatRef: any) => {
                this.chats = this.afDatabase.list(chatRef);
            });

        this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                this.user = user;
            });
        });
    }

    sendMessage() {
        if (this.message) {
            let chat = {
                from: this.uid,
                message: this.message,
                type: 'message',
                timestamp: new Date().toJSON()
            };
            this.chats.push(chat);
            this.message = "";
        }
    }
}
