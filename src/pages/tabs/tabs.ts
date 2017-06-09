import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {UsersPage} from "../users/users";
import {AccountPage} from "../account/account";
import {ChatsPage} from "../chats/chats";

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  usersRoot = UsersPage;
  chatsRoot = ChatsPage;
  accountRoot = AccountPage;


  constructor(public navCtrl: NavController) {}

}
