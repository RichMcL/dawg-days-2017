import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from "angularfire2";
import { UserProvider } from "../../providers/user/user";
import 'rxjs/add/operator/toPromise';
import { ChatViewPage } from "../chat-view/chat-view";

/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: FirebaseListObservable<any[]>;
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  async ngOnInit() {
    this.uid = await this.userProvider.getUid();
    this.users = await this.userProvider.getAllUsers();
  };

  openChat(user) {
    let param = { uid: this.uid, messagee: user };
    this.navCtrl.push(ChatViewPage, param);
  }

}
