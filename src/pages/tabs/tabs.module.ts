import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { UsersPage } from '../users/users';

@NgModule({
  declarations: [
    TabsPage,
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ]
})
export class TabsPageModule {}
