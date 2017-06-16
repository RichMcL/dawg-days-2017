import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    email: string = "";
    password: string = "";

    constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider, private alertCtrl: AlertController, private storage: Storage) { }

    signin() {
        this.authProvider.signin({ email: this.email, password: this.password }).then((data) => {
            this.storage.set('uid', data.uid);
            this.navigateToMainPage();
        }).catch((error) => {
            let alert = this.alertCtrl.create({
                title: 'Nope!',
                message: error.message ? error.message : error.toString(),
                buttons: ['Dismiss']
            });
            alert.present();
        });
    }

    createAccount() {
        this.authProvider.createAccount(this.email, this.password).then(user => {
            this.navigateToMainPage();
        }, error => {
            console.log('error creating account! error: ' + error);
        });
    }

    navigateToMainPage() {
        this.navCtrl.push(TabsPage);
    }
}
