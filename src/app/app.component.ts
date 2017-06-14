import { Component } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	private rootPage: any;

	constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private angularFireAuth: AngularFireAuth, private authProvider: AuthProvider) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

			this.intialize();
		});
	}

	intialize() {
		this.angularFireAuth.authState.subscribe(isAuthenticated => {
			this.rootPage = isAuthenticated ? TabsPage : LoginPage;
		});
	};
}

