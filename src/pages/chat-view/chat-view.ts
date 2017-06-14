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

    constructor(private navController: NavController, private navParams: NavParams, private chatsProvider: ChatsProvider, private userProvider: UserProvider, private angularFireDatabase: AngularFireDatabase, private sanitizer: DomSanitizer) {
        this.uid = navParams.data.uid;
        this.messagee = navParams.data.messagee;
    }

    async ngOnInit() {
        this.chatsProvider.getChatRef(this.uid, this.messagee.$key)
            .then((chatRef: any) => {
                this.chats = this.angularFireDatabase.list(chatRef);
            });

        this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                this.user = user;
            });
        });
    }

    sendMessage() {
        if (this.message) {
            this.chats.push({
                from: this.uid,
                message: this.message,
                type: 'message',
                timestamp: new Date().toJSON()
            });

            delete this.message;
        }
    }
}
