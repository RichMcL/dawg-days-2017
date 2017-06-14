import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";

@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    user: any;

    constructor(private appController: App, private navController: NavController, private navParams: NavParams, private authProvider: AuthProvider, private userProvider: UserProvider, private sanitizer: DomSanitizer) {
        this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                console.log("user", user)
                this.user = user;
            });
        });
    }

    logout() {
        this.navController.setRoot(LoginPage).then(() => {
            this.authProvider.signOut();
        });
    }

    updatePicture() {
        this.userProvider.updatePicture();
    }

    takePicture() {
        this.userProvider.takePicture();
    }

    updateDisplayName() {
        this.userProvider.updateDisplayName(this.user.uid, this.user.displayName);
    }

}
