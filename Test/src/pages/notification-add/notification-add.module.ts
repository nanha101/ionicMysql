import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationAddPage } from './notification-add';

@NgModule({
  declarations: [
    NotificationAddPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationAddPage),
  ],
})
export class NotificationAddPageModule {}
