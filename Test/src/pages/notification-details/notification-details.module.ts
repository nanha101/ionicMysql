import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailsPage } from './notification-details';

@NgModule({
  declarations: [
    NotificationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailsPage),
  ],
})
export class NotificationDetailsPageModule {}
