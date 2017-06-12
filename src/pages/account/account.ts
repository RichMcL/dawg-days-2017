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
                //TODO - temp to populate display name
                this.user.displayName = this.user.email;
            });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }

    logout() {
        this.authProvider.logout();
        this.appCtrl.getRootNav().setRoot(LoginPage);
    }

    updatePicture() {
        console.log("update!");
    }

}
