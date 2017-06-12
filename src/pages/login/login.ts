import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, private alertCtrl: AlertController, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

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
      console.log('successfully created account! user: ' + user);
      this.navigateToMainPage();
    }, error => {
      console.log('error creating account! error: ' + error);
    });
  }

  navigateToMainPage() {
    this.navCtrl.push(TabsPage);
  }

}
