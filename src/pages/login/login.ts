import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
      this.navCtrl.push(TabsPage);
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Nope!',
        message: error.message ? error.message : error.toString(),
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}