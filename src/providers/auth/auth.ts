import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public af: AngularFire, private angularFireAuth: AngularFireAuth, public local: Storage) {
  }

  signin(credentails) {
    return this.af.auth.login(credentails);
  }

  logout() {
    this.local.remove('uid');
    this.af.auth.logout();
  }

}
