import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    user: any;

    constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public userProvider: UserProvider) {
        this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                console.log("user", user)
                this.user = user;
            });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }

    logout() {
      this.navCtrl.setRoot(LoginPage).then(() => {
        this.authProvider.signOut();
      });
    }

    updatePicture() {
        console.log("update!");
    }

    updateDisplayName() {
        console.log("saving name");
        this.userProvider.updateDisplayName(this.user.uid, this.user.displayName);
    }

}
