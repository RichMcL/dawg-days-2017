import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatsProvider } from "../../providers/chats/chats";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the ChatViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage {
  message: string;
  uid: string;
  messagee: any;
  user: any;
  chats: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatsProvider: ChatsProvider, public userProvider: UserProvider, public af: AngularFire) {
    this.uid = navParams.data.uid;
    this.messagee = navParams.data.messagee;
  }

  async ngOnInit() {
    this.chatsProvider.getChatRef(this.uid, this.messagee.$key)
      .then((chatRef: any) => {
        this.chats = this.af.database.list(chatRef);
      });

    this.userProvider.getUser().then(userObservable => {
      userObservable.subscribe(user => {
        this.user = user;
      });
    });
  };

  sendMessage() {
    if (this.message) {
      let chat = {
        from: this.uid,
        message: this.message,
        type: 'message'
      };
      this.chats.push(chat);
      this.message = "";
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatViewPage');
  }

}
