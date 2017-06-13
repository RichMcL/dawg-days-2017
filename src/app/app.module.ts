import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule  } from 'angularfire2';
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
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { FilterPipe } from '../pipes/filter/filter';
import { Camera } from "@ionic-native/camera";
import { DomSanitizer } from '@angular/platform-browser';

export const firebaseConfig = {
  apiKey: "AIzaSyCLRvhu43PUO9Y_kPmkt2nls36LoMqFAkA",
  authDomain: "i2f-firebase-chat.firebaseapp.com",
  databaseURL: "https://i2f-firebase-chat.firebaseio.com",
  projectId: "i2f-firebase-chat",
  storageBucket: "i2f-firebase-chat.appspot.com",
  messagingSenderId: "955193895828"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    AccountPage,
    ChatViewPage,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    Camera,
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
