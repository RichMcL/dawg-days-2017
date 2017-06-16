import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseListObservable } from "angularfire2/database";
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { UserProvider } from "../../providers/user/user";
import { ChatViewPage } from "../chat-view/chat-view";

@Component({
    selector: 'page-users',
    templateUrl: 'users.html',
})
export class UsersPage {
    users: FirebaseListObservable<any[]>;
    uid: string;

    constructor(private navController: NavController, private navParams: NavParams, private userProvider: UserProvider, private sanitizer: DomSanitizer) {
        this.userProvider.getUid().then(uid => {
            this.uid = uid;
        });
        
        this.users = this.userProvider.getAllUsers();
    }

    openChat(user) {
        let param = { uid: this.uid, messagee: user };
        this.navController.push(ChatViewPage, param);
    }

}
