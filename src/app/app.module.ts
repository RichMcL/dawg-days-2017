import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { UsersPage } from "../pages/users/users";
import { AccountPage } from "../pages/account/account";
import { ChatViewPage } from "../pages/chat-view/chat-view";
import { ChatsProvider } from '../providers/chats/chats';

export const firebaseConfig = {
  apiKey: "AIzaSyCLRvhu43PUO9Y_kPmkt2nls36LoMqFAkA",
  authDomain: "i2f-firebase-chat.firebaseapp.com",
  databaseURL: "https://i2f-firebase-chat.firebaseio.com",
  projectId: "i2f-firebase-chat",
  storageBucket: "i2f-firebase-chat.appspot.com",
  messagingSenderId: "955193895828"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    AccountPage,
    ChatViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    LoginPage,
    UsersPage,
    AccountPage,
    ChatViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    IonicStorageModule,
    UserProvider,
    ChatsProvider
  ]
})
export class AppModule {}
