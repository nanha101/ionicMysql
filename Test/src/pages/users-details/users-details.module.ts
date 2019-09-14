import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersDetailsPage } from './users-details';

@NgModule({
  declarations: [
    UsersDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersDetailsPage),
  ],
})
export class UsersDetailsPageModule {}
