import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsersPage } from "../users/users";
import { AccountPage } from "../account/account";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    usersRoot = UsersPage;
    accountRoot = AccountPage;

    constructor(private navController: NavController) { }

}
